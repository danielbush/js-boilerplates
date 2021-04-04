import { json, Router } from 'express';
import cors from 'cors';

const corsConfiguration = cors({
  origin: '*',
  optionsSuccessStatus: 200,
});

export default (): Router => {
  const router = Router();
  router.use(corsConfiguration);
  router.use(json()); // req.body = js object
  router.route('/').get((req, res) => res.json({ response: 'pong' }));
  return router;
};
