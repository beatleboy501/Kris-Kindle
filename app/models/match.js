var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Match', new Schema({
  giverId: String,
  receiverId: String
}));
