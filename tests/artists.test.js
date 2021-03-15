/* tests/artists.test.js */
const { expect } = require('chai');
const request = require('supertest');
const { Artist } = require('../src/models');
const app = require('../src/app');

describe('/artists', () => {
  before(done => {
    Artist.sequelize
      .sync()
      .then(() => done())
      .catch(error => done(error));
  })

  beforeEach(done => {
    Artist.destroy({ where: {} })
      .then(() => done()).catch(error => done(error));
  })

  describe('POST /artists', (done) => {
    it('creates a new artist in the database', () => {
      request(app).post('/artists').send({
      name: 'Tame Impala',
      genre: 'Rock',
      }).then(response => {
      expect(response.status).to.equal(201);
      done();
      }).catch(error => done(error));
    });
  });
  /* tests/artists.test.js */
  describe('with artists in the database', () => {
    let artists;
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
        Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
        Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
      ]).then((documents) => {
        artists = documents;
        done();
      });
    });

  describe('GET /artists', () => {
      it('gets all artist records', (done) => {
      request(app)
        .get('/artists')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          res.body.forEach((artist) => {
          const expected = artists.find((a) => a.id === artist.id);
          expect(artist.name).to.equal(expected.name);
          expect(artist.genre).to.equal(expected.genre);
          });
          done();
          })
          .catch(error => done(error));
      });
    });
  });

  describe('PATCH /artists/:id', () => {
    xit('updates artist genre by id', (done) => {
      const artist = artists[0];
      request(app)
        .patch(`/artists/${artist.id}`)
        .send({ genre: 'Psychedelic Rock' })
        .then((res) => {
          expect(res.status).to.equal(200);
          Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
            expect(updatedArtist.genre).to.equal('Psychedelic Rock');
            done();
          }).catch(error => done(error));
        }).catch(error => done(error));
    });
});

describe('DELETE /artists/:artistId', () => {
  xit('deletes artist record by id', (done) => {
    const artist = artists[0];
    request(app)
      .delete(`/artists/${artist.id}`)
      .then((res) => {
        expect(res.status).to.equal(204);
        Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
          expect(updatedArtist).to.equal(null);
          done();
        }).catch(error => done(error));
      }).catch(error => done(error));
  });
});
})