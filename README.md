# intravenous-code-adaptor

[![Build Status](https://travis-ci.org/blacksun1/intravenous-code-adaptor.svg?branch=master)](https://travis-ci.org/blacksun1/intravenous-code-adaptor)
[![Coverage Status](https://coveralls.io/repos/github/blacksun1/intravenous-code-adaptor/badge.svg?branch=master)](https://coveralls.io/github/blacksun1/intravenous-code-adaptor?branch=master)

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
