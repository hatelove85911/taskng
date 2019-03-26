const express = require('express')
const router = express.Router()

router.post('/task1', (req, res) => {
  res.send('task1')
})
router.post('/task2', (req, res) => {
  res.send('task2')
})

module.exports = router
