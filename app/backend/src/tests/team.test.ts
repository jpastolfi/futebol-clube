import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeTeams from '../database/models/SequelizeTeams'
import { allTeams } from './mocks/Team.mock';

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
});
