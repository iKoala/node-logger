'use strict';

// const util = require('util');
const { createLogger, format, transports } = require('winston');
// var _ = require('lodash');

// var winston = require('winston');
// winston.level = 'debug';
// winston.add(new winston.transports.Console());
// winston.debug({});

const ConsoleMethods = ['log', 'info', 'warn', 'error'];

var noop = function() {}; //dummy function
var winstonLogger;
var consoleDefaultMethods = {};

ConsoleMethods.forEach(function(method) {
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
          return new Date().toString();
        }
      }),
      format.splat(),
      format.printf(function(info) {
        let message = info.message;
        if (info instanceof Error) { message = info.stack; }
        if (typeof message === 'object' || Array.isArray(message)) { message = JSON.stringify(message); }
        return `${info.timestamp} ${info.level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console()
    ]
  };

  consoleOpts = Object.assign(consoleOpts, opts.console);

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
    defaultLogger.debug = winstonLogger.debug.bind(winstonLogger);
    //winston.log is a parent method for all levels, e.g. .log('debug', 'message')
    //so replace .log with .verbose
    defaultLogger.log = defaultLogger.verbose = winstonLogger.verbose.bind(winstonLogger);
    defaultLogger.info = winstonLogger.info.bind(winstonLogger);
    defaultLogger.warn = winstonLogger.warn.bind(winstonLogger);
    defaultLogger.error = winstonLogger.error.bind(winstonLogger);
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
  ConsoleMethods.forEach(function(method) {
    console[method] = consoleDefaultMethods[method];// body...
  });
  return this;
};

var defaultLogger = new Logger();

module.exports = exports = defaultLogger;
