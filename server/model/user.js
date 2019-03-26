const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  pwd: String
});
userSchema.query.byUsername = function (username) {
  return this.where('username').equals(username)
}
userSchema.query.byEmail = function (email) {
  return this.where('email').equals(email)
}
const userModel = mongoose.model('User', userSchema);

module.exports = userModel
