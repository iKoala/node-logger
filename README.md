### @iKoala/logger

Custom Logger for Expressjs Project

#### Features

- using [winston](https://github.com/winstonjs/winston) as logger
- (optional) replace console with [winston](https://github.com/winstonjs/winston)

#### Installation

> npm install @ikoala/logger

#### Usage

```javascript
const logger = require('@ikoala/logger');
logger
	.init()
	.replaceConsole(); //replace console with @ikoala/logger
```
