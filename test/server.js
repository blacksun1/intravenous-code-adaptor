'use strict';

const Lab = require('lab');
const Code = require('code');
const Sut = require('../');
const CakeService = require('./mocks/cake');
const Sinon = require('sinon');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const beforeEach = lab.beforeEach;
const it = lab.it;
const expect = Code.expect;


describe('.', () => {

    it('should export a function', (done) => {

        // Assert
        expect(Sut).to.exist().and.be.a.function();
    });

    describe('function', () => {

        it('should take 4 arguments', (done) => {

            // Assert
            expect(Sut.length).to.equal(4);
        });

        it('should return a function', (done) => {

            // Act
            const actual = Sut();

            // Assert
            expect(actual).to.exist().and.be.a.function();
        });
    });

    describe('wrapped function', (done) => {

        let sut;
        let mockLogger;

        beforeEach((done) => {

            sut = Sut(
                ['logger'],
                ['myLogger'],
                (logger) => new CakeService(logger, 'chocolate'),
                ['eat', 'cakeType']
            );

            mockLogger = {
                info: Sinon.stub()
            };
        });

        it('should assert that constructor is called with new', (done) => {

            // Act
            const act = () => sut();

            // Assert
            expect(act).to.throw('AssertianError', /^constructor must be called with new$/);
        });

        it('should include a $inject property', (done) => {

            // Assert
            expect(sut.$inject).to.exist().to.be.an.array().and.to.equal(['myLogger']);
        });

        it('should be newable', (done) => {

            // Act
            const act = () => new Sut({});

            // Assert
            expect(act).to.not.throw();
        });

        it('should assert on required arguments', (done) => {

            // Act
            const act = () => new sut(null);

            // Assert
            expect(act).to.throw('AssertianError', /^logger is a required argument$/);
        });

        it('should proxy specified keys', (done) => {

            // Act
            const actual = new sut(mockLogger);

            // Assert
            expect(actual).to.include('cakeType');
            expect(actual.cakeType).to.exist().and.equal('chocolate');

            expect(actual).to.include('eat');
            expect(actual.eat).to.exist().and.be.a.function();
        });

        it('should inject specified constructor arguments', (done) => {

            // Arrange
            const test = new sut(mockLogger);

            // Act
            const act = () => test.eat();

            // Assert
            expect(act).to.not.throw();
            Sinon.assert.calledWith(mockLogger.info);
            Sinon.assert.calledWithExactly(mockLogger.info, 'Nom, nom, nom - I love chocolate cake');
        });
    });
});
