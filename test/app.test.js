const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest')

describe('GET / apps', () => {
    it('returns an array with at east a length of 1', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1);
            })
    })
   it('returns an array with at east a length of 1 when using queries', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'App' }, { sort: 'Rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1);
            })
    })
    it('Filters by genre correctly', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Arcade' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                res.body.forEach(app => {
                    expect(app.Genres).to.deep.include('Arcade')
                })  
            })
    })
})