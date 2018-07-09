'use strict';

const { createLogger, format, transports } = require('winston');
var _ = require('lodash');

const ConsoleMethod = ['log', 'info', 'warn', 'error'];

var noop = function() {}; //dummy function
var winstonLogger;
var consoleDefaultMethods = {};

_.each(ConsoleMethod, function(method) {
  consoleDefaultMethods[method] = console[method];
});

/**
 * @class
 */
function Logger() {
  this.silly = noop;
  this.debug = console.log;
  this.log = console.log;
  this.info = console.info;
  this.warn = console.warn;
  this.error = console.error;
}

/**
 * Initialize logger with config
 * @param {Object} config
 */
Logger.prototype.init = function(opts) {

  opts = opts || {};

  var consoleOpts = {
    level: 'debug',
    stderrLevels: ['error', 'warn'],
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: function() {
          // return new Date().toISOString();
          return new Date().toString()
        }
      }),
      format.splat(),
      format.printf(function(info) {
        let message = info instanceof Error ? info.stack : info.message;
        return `${info.timestamp} ${info.level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console()
    ]
  };

  consoleOpts = _.assign(consoleOpts, opts.console);

  winstonLogger = createLogger(consoleOpts);

  // winston.add(winston.transports.File, {
  // 	filename: '../logs/app-info.log',
  // 	level: 'debug',
  // 	maxsize: 10 * 1024 * 1024, //10mb
  // 	maxFiles: 10,
  // 	prettyPrint: true,
  // 	tailable: true
  // });

  if (defaultLogger) {
    defaultLogger.debug = winstonLogger.debug;
    //winston.log is a parent method for all levels, e.g. .log('debug', 'message')
    //so replace .log with .verbose
    defaultLogger.log = defaultLogger.verbose = winstonLogger.verbose;
    defaultLogger.info = winstonLogger.info;
    defaultLogger.warn = winstonLogger.warn;
    defaultLogger.error = winstonLogger.error;
  }

  return this;
};

/**
 * Wrapper for express.js + morgan
 */
Logger.prototype.stream = {
  write: function(message, encoding) {
    defaultLogger.info(message);
  }
};

Logger.prototype.replaceConsole = () => {
  console.debug = defaultLogger.debug;
  console.log = defaultLogger.verbose;
  console.info = defaultLogger.info;
  console.warn = defaultLogger.warn;
  console.error = defaultLogger.error;
  return this;
};

Logger.prototype.restoreConsole = () => {
  _.each(ConsoleMethod, function(method) {
    console[method] = consoleDefaultMethods[method];
  });
  return this;
};

var defaultLogger = new Logger();

module.exports = exports = defaultLogger;
