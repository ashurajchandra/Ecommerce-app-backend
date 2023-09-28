import winston from 'winston'

// Configure the logger
const logger = winston.createLogger({
  level: 'info', // Set the log level (e.g., 'info', 'error', 'debug')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`
    })
  ),
  transports: [
    // Add transports here (e.g., console, file)
    new winston.transports.Console()
    // Add other transports if needed (e.g., file transport)
  ]
})

export default logger
