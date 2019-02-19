'use strict';

const logger = require('../index');

const LOG_STR = 'test string without error';
const ERROR_OBJ = new Error('test error object');

describe('Test logger without #init', function() {
	it('should #log string without error', function() {
		logger.log('%s', LOG_STR);
	});
	
	it('should #error string without error', function() {
		logger.error('%s', ERROR_OBJ.message);
	});
});
