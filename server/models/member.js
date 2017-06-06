var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Member', new Schema({
  familyId: String,
  profilePic: String,
  firstName: String,
  lastName: String,
  hasFacebook: Boolean,
  facebookLink: String,
  isParent: Boolean,
  userName: String,
  password: String
}));
