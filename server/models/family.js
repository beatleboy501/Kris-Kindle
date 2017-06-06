var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Family', new Schema({
  name: String,
  isSingleMember: Boolean,
  phoneNumber1: String,
  phoneNumber2: String,
  address: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  members:[String]
}));
