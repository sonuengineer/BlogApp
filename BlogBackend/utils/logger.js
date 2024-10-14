const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const path = require('path');

// Define custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a Winston logger
const logger = createLogger({
  level: 'info', // Default logging level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adds timestamp to logs
    logFormat // Use custom log format defined above
  ),
  transports: [
    // Logs 'info' level and higher to the console (e.g., info, warn, error)
    new transports.Console({
      format: combine(
        colorize(), // Add colors for the console output
        logFormat
      ),
    }),
    // Logs 'error' level and higher to error.log file
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
    // Logs 'info' level and higher to combined.log file
    new transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
    }),
  ],
});

// Export the logger to be used in other files
module.exports = logger;
