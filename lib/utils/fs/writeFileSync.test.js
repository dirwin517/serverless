'use strict';

const testUtils = require('../../../tests/utils');
const Serverless = require('../../../lib/Serverless');
const expect = require('chai').expect;
const writeFileSync = require('./writeFileSync');
const readFileSync = require('./readFileSync');

describe('#writeFileSync()', () => {
  let serverless;

  beforeEach(() => {
    serverless = new Serverless();
    serverless.init();
  });

  it('should write a .json file synchronously', () => {
    const tmpFilePath = testUtils.getTmpFilePath('anything.json');

    writeFileSync(tmpFilePath, { foo: 'bar' });
    const obj = readFileSync(tmpFilePath);

    expect(obj.foo).to.equal('bar');
  });

  it('should write a .yml file synchronously', () => {
    const tmpFilePath = testUtils.getTmpFilePath('anything.yml');

    writeFileSync(tmpFilePath, { foo: 'bar' });

    return serverless.yamlParser.parse(tmpFilePath).then((obj) => {
      expect(obj.foo).to.equal('bar');
    });
  });

  it('should write a .yaml file synchronously', () => {
    const tmpFilePath = testUtils.getTmpFilePath('anything.yaml');

    writeFileSync(tmpFilePath, { foo: 'bar' });

    return serverless.yamlParser.parse(tmpFilePath).then((obj) => {
      expect(obj.foo).to.equal('bar');
    });
  });

  it('should throw error if invalid path is provided', () => {
    expect(() => { writeFileSync(null); }).to.throw(Error);
  });
});
