'use strict';

const logger = require('../index');

const LOG_STR = 'test string without error';
const ERROR_OBJ = new Error('test error object');

describe('Test logger with winston', function() {
	before('#init', function() {
		logger.init();
	});
	
	it('should #log string without error', function() {
		logger.log('%s', LOG_STR);
	});
	
	it('should #error string without error', function() {
		logger.error('%s', ERROR_OBJ.message);
	});
});

describe('Test #replaceConsole', function() {
	before('#replaceConsole', function() {
		logger.replaceConsole();
	});
	
	it('should #log string without error', function() {
		console.log('%s', LOG_STR);
	});
	
	it('should #error string without error', function() {
		console.error('%s', ERROR_OBJ.message);
	});
	
	after('#restoreConsole', function() {
		logger.restoreConsole();
	});
});
