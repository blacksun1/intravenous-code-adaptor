# intravenous-code-adaptor

An adaptor for wrapping code in a format usable by Intravenous

## Details

See [Adapting existing code for Intravenous](http://blog.blacksun.cx/how-to-adapt-your-code-to-use-intravenous/)

## How to use

```bash
npm install intravenous-code-adaptor
```

```js
'use strict';

const CodeAdaptor = require('intravenous-code-adaptor');

const sut = adaptToInjectable(
	['logger'],
    ['myLogger'],
    (logger) => new CakeService(logger, 'chocolate'),
    ['eat', 'cakeType']
);
```
