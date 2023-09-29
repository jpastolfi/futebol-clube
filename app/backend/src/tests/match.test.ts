import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { allMatches, finishedMatches, ongoingMatches, newMatchValidInfo, newMatchValidInfoReturn, newMatchSameTeam, newMatchNonExistentTeam, updatedScore } from './mocks/Match.mock'; 
import SequelizeMatches from '../database/models/SequelizeMatches';
import * as jwt from 'jsonwebtoken';
import { allTeams } from './mocks/Team.mock';
import SequelizeTeams from '../database/models/SequelizeTeams'

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
  it('Busca a lista de partidas finalizadas', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(finishedMatches as any)
    const {status, body} = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(finishedMatches);
  })
  it('Busca a lista de partidas em andamento', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(ongoingMatches as any)
    const {status, body} = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(ongoingMatches);
  })
  it('Finaliza uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(jwt, 'verify').returns({
      role: 'user',
    } as any)
    const {status, body} = await chai.request(app).patch('/matches/1/finish').set('authorization', 'validToken');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({message: "Finished"});
  }),
  it('Atualiza o placar de uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(jwt, 'verify').returns({
      role: 'user',
    } as any)
    const {status, body} = await chai.request(app).patch('/matches/1').send(updatedScore).set('authorization', 'validToken');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({message: "Match 1's score has been altered to 13x13"});
  }),
  it('Cadastra uma nova partida', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves(newMatchValidInfoReturn as any);
    sinon.stub(jwt, 'verify').returns({
      role: 'user',
    } as any)
    const {status, body} = await chai.request(app).post('/matches').send(newMatchValidInfo).set('authorization', 'validToken');
    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(newMatchValidInfoReturn);
  })
  it('Recebe um erro ao tentar cadastra uma nova partida entre dois times iguais', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves();
    sinon.stub(jwt, 'verify').returns({
      role: 'user',
    } as any)
    const {status, body} = await chai.request(app).post('/matches').send(newMatchSameTeam).set('authorization', 'validToken');
    expect(status).to.be.equal(422);
    expect(body).to.be.deep.equal({
      message: 'It is not possible to create a match with two equal teams'
    });
  }),
  it('Recebe um erro ao tentar cadastra uma nova partida com um time que não existe', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(allTeams as any)
    sinon.stub(SequelizeMatches, 'create').resolves();
    sinon.stub(jwt, 'verify').returns({
      role: 'user',
    } as any)
    const {status, body} = await chai.request(app).post('/matches').send(newMatchNonExistentTeam).set('authorization', 'validToken');
    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
  })
})