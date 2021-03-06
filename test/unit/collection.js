'use strict';

var angular           = require('angular');
var collectionFactory = require('../../src/collection');

describe('Collection', function () {

  var Model, collection;
  beforeEach(function () {
    Model = sinon.stub();
    collection = collectionFactory(Model);
  });

  it('returns an array with a reference to the model', function () {
    expect(collection)
      .to.be.an.instanceOf(Array)
      .and.to.have.property('model', Model);
  });

  it('identifies itself as a collection', function () {
    expect(collection.isCollection).to.be.true;
  });

  describe('#add', function () {

    it('casts model data and pushes it to the array', function () {
      var data = {foo: 'bar'};
      var options = {};
      Model.withArgs(data, options).returns(angular.extend(data, {id: 0}));
      expect(collection.add(data, options)).to.equal(collection);
      expect(collection).to.have.length(1);
      expect(Model).to.have.been.calledWithNew;
      expect(collection[0]).to.deep.equal({
        id: 0,
        foo: 'bar'
      });
    });

    it('can handle multiple models', function () {
      collection.add([{foo: 'bar'}, {baz: 'qux'}]);
      expect(collection).to.have.length(2);
    });

  });

});