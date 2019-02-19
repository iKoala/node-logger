'use strict';

const logger = require('../index');

const LOG_STR = 'test string without error';
const DUMMY_ARR = ['foo', 'bar'];
const DUMMY_OBJ = {foo : 'bar'};
const ERROR_OBJ = new Error('test error object');

describe.only('Test logger with winston', function() {
  before('#init', function() {
    logger.init();
  });

  it('should #log string without error', function() {
    logger.log(null);
    logger.log(LOG_STR);
    logger.log('%s', LOG_STR);
  });

  it('should #log object and Array', function() {
    logger.log([]);
    logger.log(DUMMY_ARR);
    logger.log('%j', DUMMY_ARR);
    logger.log({});
    logger.log(DUMMY_OBJ);
    logger.log('%j', DUMMY_OBJ);
  });

  it('should logger#error error object', function() {
    logger.error(ERROR_OBJ);
  });
});

describe('Test #replaceConsole', function() {
  before('#replaceConsole', function() {
    logger.init();
    logger.replaceConsole();
  });

  it('should #log string without error', function() {
    logger.log(null);
    logger.log(LOG_STR);
    logger.log('%s', LOG_STR);
  });

  it('should use #error to display error object', function() {
    logger.log([]);
    logger.log(DUMMY_ARR);
    logger.log('%j', DUMMY_ARR);
    logger.log({});
    logger.log(DUMMY_OBJ);
    logger.log('%j', DUMMY_OBJ);
  });

  after('#restoreConsole', function() {
    logger.restoreConsole();
  });
});
