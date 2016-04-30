'use strict'
var db = require('./pghelper');
var bodyParser = ('body-parser');
var values = [];

function checkIfUserExist(req, res, next){
	
  
};

function getUser(req, res, next) {

	// router.get('/login', function(req, res) {

	//     var results = [];

	//     // Get a Postgres client from the connection pool
	//     pg.connect(connectionString, function(err, client, done) {
	//         // Handle connection errors
	//         if(err) {
	//           done();
	//           console.log(err);
	//           return res.status(500).json({ success: false, data: err});
	//         }

	//         // SQL Query > Select Data
	//         var query = client.query("SELECT * FROM items ORDER BY id ASC;");

	//         // Stream results back one row at a time
	//         query.on('row', function(row) {
	//             results.push(row);
	//         });

	//         // After all data is returned, close connection and return results
	//         query.on('end', function() {
	//             done();
	//             return res.json(results);
	//         });

	//     });

	// });


	var username = req.body.username;
	var pass = req.body.password;

	var results = [];

	var allSql = "SELECT * FROM users;"

	db.query(allSql, values);

	db.query.on('row', function(row) {
	            results.push(row);
	        });

	db.query.on('end', function() {
	            
	            return res.json(results);
	        });


	// .then(function(users){
	// 	// return res.send(JSON.stringify(users));
	// 	return res.json({"users": users});

	// }).catch(next);


	// if (username == "cleber" && pass == "mama") {
	// 	res.json({
	// 		success: true,
	// 		message: "Finally you are loggedin!"
	// 	});
	// }
		// } else {
		// 	res.status(400).end("Wrong username or password");
		// }



		// if (username && pass) {
		// 	res.json({
		// 		success: function(){
		// 			var allSql = "SELECT * FROM users;"

		// 			db.query(allSql, values).then(function(users){
		// 			// return res.send(JSON.stringify(users));
		// 			return res.json({"users": users});

		// 			}).catch(next);
		// 		},
		// 		message: "Finally you are loggedin!"
		// 	});	
		// }
		// else {
		// 	res.status(400).end("Wrong username or password");
		// }
};

//exports.getUser = getUser;
exports.checkIfUserExist = checkIfUserExist;
