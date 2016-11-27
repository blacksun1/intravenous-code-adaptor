'use strict';

const Assert = require('assert');


/**
 * An adaptor for wrapping code in a format usable by Intravenous
 *
 * @param      {string[]}  ctrArgNames - The constructor arguments names. Each
 * one will be asserted as required
 * @param      {string[]}  ctrArgInjectNames - The values to be set on the
 * $inject property
 * @param      {function.<object>}  objectFactory - A function that should return an
 * object. The object is the service that will be proxied
 * @param      {string[]}  proxiedKeys - An array of keys that should be exported
 * from the object returned from the objectFactory
 * @return     {function} - The WrapperFunction that creates the service
 */
exports = module.exports = function adaptToInjectable(ctrArgNames, ctrArgInjectNames, objectFactory, proxiedKeys) {

    const WrapperFunction = function () {

        // Assert that constructor is new'ed
        Assert(this && this.constructor === WrapperFunction, 'constructor must be called with new');

        // Assert arguments
        for (let i = 0; i < ctrArgNames.length; i += 1) {
            Assert(arguments[i.toString()], `${ctrArgNames[i]} is a required argument`);
        }

        // Constructor wrapper object
        const args = Array.from(arguments);
        this.wrappedObject_ = objectFactory.apply(null, args);

        // Proxy each key in proxiedKeys
        for (const key of proxiedKeys) {
            const actor = this.wrappedObject_[key];

            // Something is pertty wrong if we are proxying a key with an undefined value
            Assert(typeof actor !== 'undefined', `proxiedKey ${key} does not exist`);

            // If the property is a function then bind it back to the wrappedObject,
            // otherwise just set one to the other
            if (typeof actor === 'function') {
                this[key] = actor.bind(this.wrappedObject_);
            }
            else {
                this[key] = actor;
            }
        }
    };

    // Add $inject
    WrapperFunction.$inject = ctrArgInjectNames;

    return WrapperFunction;
};
