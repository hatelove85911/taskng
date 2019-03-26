const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({ level: 'silly' }),
    new transports.File({ filename: '/var/log/taskng-error.log', level: 'error' }),
    new transports.File({ filename: '/var/log/taskng-combined.log', level: 'info' })
  ]
});


module.exports = logger
