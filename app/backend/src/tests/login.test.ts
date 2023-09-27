import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import * as bcrypt from 'bcryptjs'

import SequelizeUsers from '../database/models/SequelizeUsers';
import { noUsernameLogin, noPasswordLogin, validLogin, validLoginReturn, invalidUsernameLogin, invalidPasswordLogin, modelResponse, nonExistentEmail, wrongPassword } from './mocks/User.mock';
import { IUser } from '../Interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', async function() {
  this.afterEach(() => sinon.restore());
  it('Faz o login efetivamente com um usuário existente', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(modelResponse as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    const { status, body } = await chai.request(app).post('/login').send(validLogin);
    expect(status).to.be.equal(200);
    expect(body).to.have.property('token');
  }),
  it('Recebe um erro ao tentar fazer o login sem o campo de usuário preenchido', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(noUsernameLogin);
    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal({ message: "All fields must be filled" });
  }),
  it('Recebe um erro ao tentar fazer o login sem o campo de senha preenchido', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(noPasswordLogin);
    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal({ message: "All fields must be filled" });
  }),
  it('Recebe um erro ao tentar fazer o login com um email com formato inválido', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(invalidUsernameLogin);
    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: "Invalid email or password" });
  })
  it('Recebe um erro ao tentar fazer o login com um password com formato inválido', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(invalidPasswordLogin);
    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: "Invalid email or password" });
  })
  it('Recebe um erro ao tentar fazer o login com um usuário não cadastrado', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(nonExistentEmail);
    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: "Invalid email or password" });
  })
  it('Recebe um erro ao tentar fazer o login com uma senha errada', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    sinon.stub(bcrypt, 'compareSync').returns(false);
    const { status, body } = await chai.request(app).post('/login').send(wrongPassword);
    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: "Invalid email or password" });
  })
})