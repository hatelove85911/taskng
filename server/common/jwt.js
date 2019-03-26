module.exports = {
  sign: function (payload) {
    return jwt.sign({ user: username }, 'sj');
  }
}
