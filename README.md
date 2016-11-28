# intravenous-code-adaptor

[![Build Status](https://travis-ci.org/blacksun1/intravenous-code-adaptor.svg?branch=master)](https://travis-ci.org/blacksun1/intravenous-code-adaptor)
[![Coverage Status](https://coveralls.io/repos/github/blacksun1/intravenous-code-adaptor/badge.svg?branch=master)](https://coveralls.io/github/blacksun1/intravenous-code-adaptor?branch=master)

An adaptor for wrapping code in a format usable by Intravenous

## Details

See [Adapting existing code for Intravenous](http://blog.blacksun.cx/how-to-adapt-your-code-to-use-intravenous/)

## How to use

So, you have some sort of service that you want to use with Intravenous but its
interface doesn't fit what is required by it. Here is an example.

```js
// cakeService.js
'use strict';

exports = module.exports = class CakeService {

    constructor(logger, cakeType) {

        Assert(logger);
        Assert(cakeType);
        this.logger_ = logger;
        this.cakeType_ = cakeType;
    }

    eat() {

        this.logger_.info(`Nom, nom, nom - I love ${this.cakeType_} cake`);
    }

    get cakeType() {

        return this.cakeType_;
    }
};
```

In order to use it with Intravenous you would need to transpile the class to ES5
as Intravenous doesn't support ES6 classes. You would also need to add a
`$inject` property. To do all this (and more) is what `intravenous-code-adaptor`
does.

Add the package to your application

```bash
npm install intravenous-code-adaptor --save
```

Then use it to create a wrapper

```js
// cakeServiceWrapper.js
'use strict';

const CodeAdaptor = require('intravenous-code-adaptor');
const Cake = require('./cakeService');


exports = module.exports = CodeAdaptor(
	['logger'],
    ['myLogger'],
    (logger) => new Cake(logger, 'chocolate'),
    ['eat', 'cakeType']
);
```

and then add this service to your IOC container

```js
// bootstrapper
'use strict';

const Intravenous = require('intravenous');
const Cake = require('./cakeServiceWrapper');

const container  = Intravenous.create();
container.register('myLogger', console);
container.register('cake', Cake);

const cake = container.get('cake');
```

Please check the [tests](test/server.js) and the [JSDocs in the code](src/server.js) for more information.
