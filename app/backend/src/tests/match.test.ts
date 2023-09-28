import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { allMatches } from './mocks/Match.mock'; 
import SequelizeMatches from '../database/models/SequelizeMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', async function() {
  this.afterEach(() => sinon.restore());
  it('Busca a lista de partidas', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any)
    const {status, body} = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allMatches);
  })
  // Falta testar o GET de partidas com query string (requisito 16)
  it('Finaliza uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    const {status, body} = await chai.request(app).patch('/matches/1');
    console.log(status);
    console.log(body);
  }),
  it('Atualiza o placar de uma partida', async function() {
  })
})