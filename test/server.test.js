process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const config = require('../knexfile')['test'];
const database = require('knex')(config);

chai.use(chaiHttp)

describe('Server file', () => {
  describe('/api/v1/stations', () => {
    beforeEach(done => {
      database.migrate.rollback()
        .then(() => database.migrate.latest())
        .then(() => database.seed.run())
        .then(() => done())
    })

    after(done => {
      database.migrate.rollback()
        .then(() => done())
    })

    it('GET sends back a 200 status code', done => {
      chai.request(app)
        .get('/api/v1/stations')
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        })
    })
  })
})
