const bcrypt = require('bcrypt')
const UserModel = require('../model/user.js')
const logger = require('../common/logger')
const jwt = require('jsonwebtoken')

module.exports = {
  loginByUserPwd (req, res) {
    const { username, pwd } = req.body
    UserModel.findOne().byUsername(username)
      .then((user) => {
        if (user) {
          bcrypt.compare(pwd, user.pwd)
            .then((data) => {
              if (data) {
                res.json({
                  message: 'Authentication Successful!',
                  token: jwt.sign({ user: username }, 'sj')
                })
              } else {
                // login fail
                res.status(401)
                  .json({
                    message: 'Login Failed!'
                  })
              }
            })
        }
      })
  },
  register (req, res) {
    const { email, username, pwd } = req.body
    logger.info(`register: ${username}, ${email}, ${pwd}`)
    // check user, email exists
    UserModel.findOne().byUsername(username)
      // .or()
      // .byEmail(email)
      .then((user) => {
        if (user) {
          // found respond error
          res.status(409).json({
            error: 'User already exists'
          })
        } else {
          bcrypt.hash(pwd, 10, function (err, hash) {
            if (err) {
              // todo handle error
            }
            const user = new UserModel({
              username,
              email,
              pwd: hash
            })
            // store user
            user.save()
              .then(() => {
                res.status(201)
                  .json({
                    message: 'Register Successfully!',
                    token: jwt.sign({ user: username }, 'sj')
                  })
              })
          })
        }
      })
  }
}
