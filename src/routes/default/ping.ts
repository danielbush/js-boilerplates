import { json, Router } from 'express';
import cors from 'cors';

const ping = Router();
ping.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);
ping.use(json()); // req.body = js object
ping.route('/').get((req, res) => res.json({ response: 'pong' }));

export { ping };
