const express = require('express')
const router = express.Router()
const { loginByUserPwd, register } = require('../controller/user.js')

router.post('/login', loginByUserPwd)
router.post('/register', register)

module.exports = router
