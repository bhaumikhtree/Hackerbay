/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');
require('dotenv').config();
const app = require('../app');

describe('Testing for HackerBay ', () => {
  let token;

  const image = 'https://images.unsplash.com/photo-1564874757179-b0358f74df91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
  // space is there to make invalid url
  const invalidURL = 'https:    //images.unsplash.com/photo-1564874757179-b0358f74df91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
  const jsonobject = '{ "firstName" : "Albert", "contactDetails": { "phoneNumbers": [] } }';
  const jsonpatchobject = '[{ "op": "replace", "path": "/firstName", "value": "Joachim" },\n'
  + '{ "op": "add", "path": "/lastName", "value": "Wester" },{"op":"add","path":"/contactDetails/phoneNumbers/0","value":{"number": "555-123"}}]';

  describe('login', () => {
    it('it should not return token in if username and password one of them is empty', (done) => {
      request
        .agent(app)
        .post('/login')
        .send({ username: 'someone', password: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('it should accept a username and password and return json webtoken', (done) => {
      request
        .agent(app)
        .post('/login')
        .send({ username: 'htree', password: 'plus' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.auth).to.equal(true);
          token = res.body.token;
          done();
        });
    });
  });

  describe('thumbnail', () => {
    it('it should not process image if token is invalid', (done) => {
      request
        .agent(app)
        .post('/service/thumbnail')
        .set('x-access-token', 'invalid token')
        .send({ image })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.auth).to.equal(false);
        });
      done();
    });

    it('it should not process image if url is invalid', (done) => {
      request
        .agent(app)
        .post('/service/thumbnail')
        .set('x-access-token', token)
        .send({ image: invalidURL })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
        });
      done();
    });

    it('it should give error if url is not of image', (done) => {
      request
        .agent(app)
        .post('/service/thumbnail')
        .set('x-access-token', token)
        .send({ image: 'https://www.google.com/' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
        });
      done();
    });

    it('it should accept image url and return a resized image', (done) => {
      request
        .agent(app)
        .post('/service/thumbnail')
        .set('x-access-token', token)
        .send({ image })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('jsonpatch', () => {
    it('it should not patch if token is invalid', (done) => {
      request
        .agent(app)
        .patch('/service/jsonpatch')
        .set('x-access-token', 'invalid token')
        .send({ jsonobject, jsonpatchobject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.auth).to.equal(false);
        });
      done();
    });

    it('it should patched given object', (done) => {
      request
        .agent(app)
        .patch('/service/jsonpatch')
        .set('x-access-token', token)
        .send({ jsonobject, jsonpatchobject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('it should give error if jsonobject and jsonpatch object is empty', (done) => {
      request
        .agent(app)
        .patch('/service/jsonpatch')
        .set('x-access-token', token)
        .send({ jsonobject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('it should give error if jsonobject and jsonpatch is not object or array', (done) => {
      request
        .agent(app)
        .patch('/service/jsonpatch')
        .set('x-access-token', token)
        .send("{ 'jsonobject': 'htree', 'jsonpatchobject': 'plus' }")
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});
