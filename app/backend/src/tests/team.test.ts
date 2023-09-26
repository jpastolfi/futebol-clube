import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeTeams from '../database/models/SequelizeTeams'
import { allTeams, firstTeam, idToSearchAndFail } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Busca todos os times existentes com sucesso', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(allTeams as any)
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allTeams);
  });

  it('Buscar um time específico pelo seu id', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(firstTeam as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(firstTeam);
  });

  it('Retorna um erro ao buscar por um id inexistente', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get(`/teams/${idToSearchAndFail}`);
    expect(status).to.be.equal(404);
    expect(body.message).to.be.deep.equal(`Team ${idToSearchAndFail} not found`);
  });
});
