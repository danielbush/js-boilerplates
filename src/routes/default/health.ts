import { Router, json } from 'express';

const healthStatus = { ok: true };
const health = Router();
health.use(json()); // req.body = js object
health.route('/').get((req, res) => res.status(200).send(healthStatus));

export { health };
