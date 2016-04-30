
var compression = require('compression');
var products = require('./server/products');
var loginUsers = require('./server/login');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var router = express.Router();
	

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//Suggestion from Haitham but not needed.
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.set('port', process.env.PORT || 5001);
app.set('view engine', 'html');

app.use(compression());
app.use('/', express.static(__dirname + '/www'));

app.get('/products', products.findAll);
app.get('/products/:id', products.findById);

// ------------------------------------------
//	Insert an element on an existing object
// ------------------------------------------
		
app.post('/update',products.update);

app.post('/login', products.getUser);

app.post('/register', products.addUserToDB);



/* TODO: Put this function back if it doesn't work with login import/export
*  
*/
// 	function(req, res) {
// 	var username = req.body.username;
// 	var pass = req.body.password;

// 	if (username == "cleber" && pass == "mama") {
// 		res.json({
// 			success: true,
// 			message: "You are loggedin!"
// 		});
// 	} else {
// 		res.status(400).end("Wrong username or password");
// 	}
// });

//app.post('/delete',products.delete);

/*  
*   This is use if the routes above did not match GET or POST
*	Used to display the information and DEBUG
*/

// app.use(function(req, res){
// 	res.json({
// 		msg: req.body
// 	});
// });

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


// POST http://localhost:8080/api/users
// parameters sent with 

// app.post('/api/users', function(req, res) {
//     var user_id = req.body.id;
//     var token = req.body.token;
//     var geo = req.body.geo;

//     res.send(user_id + ' ' + token + ' ' + geo);
// });