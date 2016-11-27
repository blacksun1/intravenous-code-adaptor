'use strict';

const Assert = require('assert');


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
