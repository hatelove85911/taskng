const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const routes = require('./routes/index.js')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskng', {useNewUrlParser: true});
const morgan = require('morgan')
const logger = require('./common/logger.js')

const db = mongoose.connection;
db.on('error', () => {
  logger.error('database connect error!')
});
db.once('open', function() {
  logger.error('databse connection opened!')

  app.use(morgan('combined'))
  app.use(bodyParser.json())
  app.use(routes)

  app.listen(port, () => logger.info(`app listening on port ${port}!`))
});

