'use strict'
var db = require('./pghelper');
var bodyParser = ('body-parser');

function escape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function findAll(req, res, next) {

    var pageSize = 20,
        page = req.query.page ? parseInt(req.query.page) : 1,
        search = req.query.search,
        min = req.query.min,
        max = req.query.max,
        whereParts = [],
        values = [];

    if (search) {
        values.push(escape(search));
        whereParts.push("items.itemname || items.tags || icons.name ~* $" + values.length);
    }
    if (min) {
        values.push(min);
        whereParts.push("items.weight >= $" + values.length);
    }
    if (max) {
        values.push(max);
        whereParts.push("items.weight <= $" + values.length);
    }

    var where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";

    var countSql = "SELECT COUNT(*) from items INNER JOIN icons on items.iconid = icons.id " + where;

    var sql = "SELECT items.id, items.itemname, items.weight, items.tags, items.image, icons.name as icons " +
                "FROM items INNER JOIN icons on items.iconid = icons.id " + where +
                " ORDER BY items.itemname LIMIT $" + (values.length + 1) + " OFFSET $" +  + (values.length + 2);

    // TODO: Use q to run the two queries in parallel
    db.query(countSql, values)
        .then(function (result) {
            var total = parseInt(result[0].count);
            db.query(sql, values.concat([pageSize, ((page - 1) * pageSize)]))
                .then(function(products) {
                    return res.json({"pageSize": pageSize, "page": page, "total": total, "products": products});
                })
                .catch(next);
        })
        .catch(next);
};

function findById(req, res, next) {
    var id = req.params.id;

    var sql = "SELECT items.id, items.itemname, items.weight, items.tags, items.image icons.name as icons FROM items" +
                "INNER JOIN icons on items.iconid = icons.id " +
                "WHERE items.id = $1";

    db.query(sql, [id])
        .then(function (product) {
            return res.send(JSON.stringify(product));
        })
        .catch(next);
};

function getUser(req, res, next) {

    var username = req.body.username;
    var pass = req.body.password;

    //This Query to get all users 
    //var sql = "SELECT * FROM users";

    var where = "WHERE username = " + username + " AND password = " + pass + "";

    var sql = "SELECT username, password " +
                "FROM users " + where;
               

    var results = [];

    db.query(sql)
        .then(function(row){
            results.push(row.username);
            
            var queryresult = res.json(JSON.stringify(results));            
            console.log("Query results:", queryresult); 

            //return res.json(JSON.stringify(results));
        });
        //.catch(next);

    // db.query.on('row', function(row) {
    // });

    // db.query.on('end', function() {
    //     // done();
    // });

};

function addUserToDB(req, res){
    
    var data = {username: req.body.username, password: req.body.password};
    
    /*TODO: 
     * It is working saving to the DB but takes a little time to get the data into the DB
     * Find out how we can register the user and check it the user already exist
     * Try to use email address instead of username
    */
    db.query("INSERT INTO users(username,password,first_name,last_name) values($1,$2,$4,$5)", [data.username, data.password,"Maria","Domingues"]);
    
};

function update(req, res){
    //console.log(req);
    //var values = req.body.values;
    var results = [];

    //In the AJAX is not necessary to console.log
    //JUST use the line below the get the response
    //var data = res.json(req.body);

    console.log(req.body);


    // res.render('../www/index', {});

    // Grab data from http request
    // var data = {text: req.body.text, complete: false};

    // // Get a Postgres client from the connection pool
    // db.connect(connectionString, function(err, client, done) {
    //     // Handle connection errors
    //     if(err) {
    //       done();
    //       console.log(err);
    //       return res.status(500).json({ success: false, data: err});
    //     }

    // SQL Query > Insert Data
    // db.query("INSERT INTO items(weight) values($2)", [data.text]);
    

    var w = req.body.values[0].value;
    var id = req.body.values[0].key;

    // console.log(w);
    // console.log(id);

    //db.query("UPDATE items SET weight = "+w+" WHERE id = "+id+";");

    res.json(req.body);

    
        // // SQL Query > Select Data
        // var query = db.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        // query.on('row', function(row) {
        //     results.push(row);
        // });

        // // After all data is returned, close connection and return results
        // query.on('end', function() {
        //      done();
        //      console.log(results);
        //      return res.json(results);
        //  });


    // });
};


exports.findAll = findAll;
exports.findById = findById;
exports.update = update;
exports.getUser = getUser;
exports.addUserToDB = addUserToDB;