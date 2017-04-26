/** @module Server */

/** The express framework is used for routing in this node app */
var express = require('express');
var apiRoutes = express.Router();
var app = express();

/** Body parsing middleware.
 * Parse incoming request bodies in a middleware before the handlers,
 * available under the <i>req.body</i> property. */
var bodyParser = require('body-parser');
/** Morgan is a HTTP request logger middleware for node */
var morgan = require('morgan');
/** Mongoose is a MongoDB object modeling tool */
var mongoose = require('mongoose');
/** Unirest is a set of lightweight HTTP libraries */
var unirest = require('unirest');
/** JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties.  */
var jwt = require('jsonwebtoken');
/** The app configuration */
var config = require('./config');
/** The User model */
var User = require('./app/models/user');
/** The port used. Default is 8080 */
var port = process.env.PORT || 8080;

mongoose.connect(config.database);

/** Add middleware to the app router */
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('app/assets/javascripts'));
app.use('/app/assets/javascripts', express.static('app/assets/javascripts'));

/** API routes */

/**
 * @name  <b> /authenticate </b> - The authenticate route will take the username/password entered and scan the database for an entry.
 * If successful it will return an auth token good for 24 hours.
 * apiRoutes.post
 * @function
 * @param {Object} req - the request which includes a JSON body with username/password
 * @param {Object} res - the response object containing status, message, and success boolean
 */
apiRoutes.post('/authenticate', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(400).send({success: false, message: 'Authentication failed. User not found.'});
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({success: false, message: 'Authentication failed. Wrong password.'});
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

/**
 * @name <b> /create </b> - The create route will create a user with the username/password entered and save to the database.
 * apiRoutes.post
 * @function
 * @param {Object} req - the request which includes a JSON body with username/password as well as an 'admin' boolean (if not admin, will not be able to generate a token)
 * @param {Object} res - the response object containing status, message, and success boolean
 */
apiRoutes.post('/create', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;
    if (user) {
      res.status(400).send({success: false, message: 'Registration failed. User already exists.'});
    } else if (!user) {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        admin: true
      });
      newUser.save(function (err) {
        if (err) throw err;
        console.log('User ' + newUser.username + ' saved successfully');
        res.json({success: true});
      });
    }
  });
});

/**
 * @name <b> authenticated function </b> - All routes below will need to be authenticated by including a generated token in the post body, query parameter, or header (x-access-token).
 * apiRoutes.use
 * @function
 * @param {Object} req - the request which includes a JSON body which can contain the auth token
 * @param {Object} res - the response object containing status, message, and success boolean
 * @param next - the function to execute upon successful authentication
 */
apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

/**
 * @name <b> /users </b> - The users route will return a list of the users in the database.
 * apiRoutes.get
 * @function
 * @param {Object} req - the request which includes a JSON body
 * @param {Object} res - the response object containing status, message, and success boolean
 */
apiRoutes.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

app.use('/api', apiRoutes);

app.listen(port);
