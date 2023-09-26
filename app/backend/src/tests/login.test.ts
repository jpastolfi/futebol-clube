import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeUsers from '../database/models/SequelizeUsers';
import { noUsernameLogin, noPasswordLogin, validLogin, validLoginReturn } from './mocks/User.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', async function() {
  this.afterEach(() => sinon.restore());
  it('Faz o login efetivamente com um usuário existente', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(validLoginReturn as any);
    const { status, body } = await chai.request(app).post('/login').send(validLogin);
  }),
  it('Recebe um erro ao tentar fazer o login sem o campo de usuário preenchido', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(noUsernameLogin);
  }),
  it('Recebe um erro ao tentar fazer o login sem o campo de senha preenchido', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(noPasswordLogin);
  })
})