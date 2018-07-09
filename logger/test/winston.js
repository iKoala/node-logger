'use strict';

const logger = require('../index');

const LOG_STR = 'test string without error';
const DUMMY_OBJ = {foo: 'bar'};
const ERROR_OBJ = new Error('test error object');

describe('Test logger with winston', function() {
  before('#init', function() {
    logger.init();
  });

  it('should #log string without error', function() {
    logger.log('%s', LOG_STR);
  });

  it('should #log an object', function() {
    logger.log('%j', DUMMY_OBJ);
  });

  it('should #error string without error', function() {
    logger.error(ERROR_OBJ);
  });
});

describe('Test #replaceConsole', function() {
  before('#replaceConsole', function() {
    logger.init();
    logger.replaceConsole();
  });

  it('should #log string without error', function() {
    console.log('%s', LOG_STR);
  });

  it('should use #error to display error object', function() {
    console.error(ERROR_OBJ);
    // console.error('%s', ERROR_OBJ.message);
  });

  after('#restoreConsole', function() {
    logger.restoreConsole();
  });
});
