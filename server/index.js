/** @module Server */

/** The express framework is used for routing in this node app */
const express = require('express');
let apiRoutes = express.Router();
let app = express();

/** Body parsing middleware.
 * Parse incoming request bodies in a middleware before the handlers,
 * available under the <i>req.body</i> property. */
const bodyParser = require('body-parser');
/** Morgan is a HTTP request logger middleware for node */
const morgan = require('morgan');
/** Mongoose is a MongoDB object modeling tool */
const mongoose = require('mongoose');
/** Unirest is a set of lightweight HTTP libraries */
const unirest = require('unirest');
/** JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties.  */
const jwt = require('jsonwebtoken');
/** The app configuration */
const config = require('./config');
/** The port used. Default is 8080 */
const port = process.env.PORT || 8080;
/** Our Models */
const Family = require('./models/family');
const Member = require('./models/member');
const Draw = require('./models/draw');
const Match = require('./models/match');

mongoose.connect(config.database);

/** Add middleware to the app router */
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('app/assets/javascripts'));
app.use('/app/assets/javascripts', express.static('app/assets/javascripts'));

/** API routes */

apiRoutes.get('/family', (req, res) =>{
  Family.find({}, function (err, families) {
    res.json(families);
  });
});

apiRoutes.get('/family/:id', (req, res) =>{
  Family.findOne({
    id: req.query.id
  }, function (err, family) {
    if (err) throw err;
    if (!family) {
      res.status(404).send({success: false, message: 'Family not found.'});
    } else if (family) {
      res.json(family);
    }
  });
});

apiRoutes.get('/family/:id/members', (req, res) =>{
  Family.findOne({
    id: req.query.id
  }, function (err, family) {
    if (err) throw err;
    if (!family) {
      res.status(404).send({success: false, message: 'Family not found.'});
    } else if (family) {
      res.json(family.members);
    }
  });
});

apiRoutes.post('/family', (req, res) =>{
  Family.findOne({
    name: req.body.name
  }, function (err, family) {
    if (err) throw err;
    if (family) {
      res.status(400).send({success: false, message: 'Add family failed. Family ' + req.body.name + ' already exists.'});
    } else {
      const doc = new Family({
        name: req.body.name,
        isSingleMember: req.body.isSingleMember,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2,
        address: {
          street1: req.body.address.street1,
          street2: req.body.address.street2,
          city: req.body.address.city,
          state: req.body.address.state,
          postalCode: req.body.address.postalCode,
          country: req.body.address.country
        },
        members: req.body.members
      });
      doc.save(function (err) {
        if (err) throw err;
        console.log('Family ' + doc.name + ' saved successfully');
        res.json(doc);
      });
    }
  })
});

apiRoutes.put('/family/:id/member', (req, res) =>{
  Family.findByIdAndUpdate(req.params.id,
      {$push: {"members": req.body.memberId}},
      {safe: true, upsert: true},
      function(err, family) {
        if(err){
          res.send(err);
        }
        res.json(family);
      });
});

apiRoutes.put('/family/:memberId/member', (req, res) =>{
  Family.findOneAndUpdate({name: req.params.name}, req.body, function(err, family) {
    if(err){
      res.send(err);
    }
    res.json(family);
  })
});

apiRoutes.put('/family/:id/name', (req, res) =>{
  const doc = { name: req.body.name };
  Family.update({_id: req.params.id}, doc, (err, family) =>{
    if(err){
      res.send(err);
    }
    res.json(family);
  });
});

apiRoutes.put('/family/:id/address', (req, res) =>{
  const doc = { address: {
    street1: req.body.street1,
    street2: req.body.street2,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    country: req.body.country
  }};
  Family.update({_id: req.params.id}, doc, (err, family) =>{
    if(err){
      res.send(err);
    }
    res.json(family);
  });
});

apiRoutes.delete('/family/:id', (req, res) =>{
  Family.remove({_id: req.params.id}, err =>{
    if(err){
      res.send(err);
    }
    res.json({success: true});
  });
});

apiRoutes.get('/member', (req, res) =>{
  Member.find({}, (err, members) =>{
    res.json(members);
  });
});

apiRoutes.get('/member/:id', (req, res) =>{
  Member.findOne({
    id: req.query.id
  }, (err, member) =>{
    if (err) throw err;
    if (!member) {
      res.status(404).send({success: false, message: 'Member not found.'});
    } else if (member) {
      res.json(member);
    }
  });
});

apiRoutes.post('/member', (req, res) =>{
  Member.findOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }, (err, member) =>{
    if (err) throw err;
    if (member) {
      res.status(400).send({success: false, message: 'Add Member failed. Member ' + req.body.firstName + ' ' + req.body.lastName + ' already exists.'});
    } else {
      const doc = new Member({
        familyId: req.body.familyId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
        hasFacebook: req.body.hasFacebook,
        facebookLink: req.body.facebookLink,
        isParent: req.body.isParent,
        userName: req.body.userName,
        password: req.body.password
      });
      doc.save(err =>{
        if (err) throw err;
        console.log('Member ' + doc.firstName + ' ' + doc.lastName + ' saved successfully');
        res.json(doc);
      });
    }
  })
});

apiRoutes.put('/member/:id', (req, res) =>{
  Member.findOneAndUpdate({_id: req.params.id}, req.body, (err, member) =>{
    if(err){
      res.send(err);
    }
    res.json(member);
  })
});

apiRoutes.delete('/member/:id', (req, res) =>{
  Member.remove({_id: req.params.id}, err =>{
    if(err){
      res.send(err);
    }
    res.json({success: true});
  })
});

apiRoutes.get('/draw', (req, res) =>{
  Draw.find({}, (err, draws) =>{
    res.json(draws);
  });
});

apiRoutes.get('/draw/:year', (req, res) =>{
  Draw.findOne({
    year: req.params.year
  }, (err, draw) =>{
    if (err) throw err;
    if (!draw) {
      res.status(404).send({success: false, message: 'Draw not found for ' + req.body.year});
    } else if (draw) {
      res.json(draw);
    }
  });
});

function generateDraw(givers, receivers) {
  // Rules: Family can't buy for itself,
  // Families can't buy for each other,
  // All givers must have a receiver
  // Stretch goal would be to have no triangulation, i.e. a -> b, b -> c, c -> a not allowed
  let generate = true;
  let matches = {};
  while (generate) {
    givers = randomlySortArray(givers);
    receivers = randomlySortArray(receivers);
    for (let i = 0; i < receivers.length; i++) {
      const giver = givers[i];
      matches[giver] = receivers[i];
    }
    let needSwap = [];
    Object.keys(matches).forEach((key) => { //O(N)
      const value = matches[key];
      if (value === key || matches[value] === key) {
        needSwap.push({key, value});
      }
    });
    generate = needSwap.length > 0
  }
  let matchArray = [];
  Object.keys(matches).forEach((key) => {
    const value = matches[key];
    matchArray.push({giverId: key, receiverId: value})
  });
  return {
    matches: matchArray
  }
}

function randomlySortArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

apiRoutes.post('/generate-draw', (req, res) =>{
  Draw.findOne({
    year: req.body.year
  }, (err, draw) =>{
    if (err) throw err;
    if (draw) {
      res.status(400).send({success: false, message: 'Add Draw failed. Draw ' + req.body.year + ' already exists.'});
    } else {
      const newDraw = generateDraw(req.body.givers, req.body.receivers);
      const doc = new Draw({
        year: req.body.year,
        participantCount: newDraw.matches.size,
        matches: newDraw.matches
      });
      doc.save(err =>{
        if (err) throw err;
        console.log('Draw ' + doc.year + ' saved successfully');
        res.json(doc);
      });
    }
  })
});

apiRoutes.delete('/draw/:year', (req, res) =>{
  Draw.remove({year: req.params.year}, err =>{
    if(err){
      res.send(err);
    }
    res.json({success: true});
  })
});

apiRoutes.get('/match', (req, res) =>{
  Match.find({}, (err, draws) =>{
    res.json(draws);
  });
});

apiRoutes.get('/match/:id', (req, res) =>{
  Match.findOne({
    id: req.query.id
  }, (err, match) =>{
    if (err) throw err;
    if (!match) {
      res.status(404).send({success: false, message: 'Match not found.'});
    } else if (match) {
      res.json(match);
    }
  });
});

apiRoutes.get('/match/:giverId', (req, res) =>{
  Match.findOne({
    giverId: req.query.giverId
  }, (err, match) =>{
    if (err) throw err;
    if (!match) {
      res.status(404).send({success: false, message: 'No Match found for giver' + req.query.giverId});
    } else if (match) {
      res.json(match.receiverId);
    }
  });
});

apiRoutes.get('/match/:receiverId', (req, res) =>{
  Match.findOne({
    receiverId: req.query.receiverId
  }, (err, match) =>{
    if (err) throw err;
    if (!match) {
      res.status(404).send({success: false, message: 'No Match found for giver' + req.query.receiverId});
    } else if (match) {
      res.json(match.giverId);
    }
  });
});

apiRoutes.delete('/match', (req, res) =>{
  Match.remove({_id: req.params.id}, err =>{
    if(err){
      res.send(err);
    }
    res.json({success: true});
  })
});

app.use('/api', apiRoutes);

app.listen(port);
