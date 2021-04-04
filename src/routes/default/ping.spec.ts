import request from 'supertest';
import express from 'express';
import { ping } from './ping';

// https://medium.com/@pojotorshemi/integration-test-on-express-restful-apis-using-jest-and-supertest-4cf5d1414ab0

describe('ping/', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = express();
    app.use('/ping', ping);
  });

  it('should pong', async () => {
    await request(app)
      .get('/ping')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('response', 'pong');
      });
  });
});
