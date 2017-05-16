var mongoose = require('mongoose'),
    Match = require('./match.js'),
    MatchSchema = mongoose.model('Match').schema,
    Schema = mongoose.Schema;

module.exports = mongoose.model('Draw', new Schema({
  year: String,
  participantCount: Number,
  matches: [MatchSchema]
}));
