'use strict'

//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    CityModel = require('./models/CityModel'),
    PostModel = require('./models/PostModel'),
    UserModel = require('./models/UserModel'),
    CommentModel = require('./models/CommentModel');


//create instances
var app = express(),
    router = express.Router();

// set port to env or 3000
var port = process.env.API_PORT || 3001;

//db config
//ADD YOUR INFO HERE!
// To connect using a driver via the standard MongoDB URI (what's this?):
// mongoose.connect('mongodb://ali554:123456@ds161159.mlab.com:61159/mern-crud');
var controllers = require('./controllers');


//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// set route path and init API
// router.get('/', function(req,res) {
//   res.json({message: 'API Initialized!'});
// });
//
//
// /*
//  * JSON API Endpoints
//  */
//  router.route('/city')
//
//   .get(function(req,res) {
//     City.find(function(err, cities){
//       if(err){ res.send(err)}
//       res.json(city);
// });
// })
// .post(function(req, res) {
//     var comment = new City();
//     city.name = req.body.name;
//     // comment.text = req.body.text;
//
//     city.save(function(err) {
//       if(err){res.send(err)}
//       res.json({ message: 'city successfully added!'});
//     });
//   });
//
//

app.get('/api', controllers.api.index);

app.get('/api/cities', controllers.cities.index);
app.get('/api/cities/:cityId', controllers.cities.show);


// //use router config when we call /API
// app.use('/api', router);

//start server
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
