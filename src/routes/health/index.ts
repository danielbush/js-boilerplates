import { Router } from 'express';
import { json } from 'body-parser';

export default (): Router => {
  const router = Router();
  router.use(json()); // req.body = js object
  router.route('/').get((req, res) => res.status(200).end());
  return router;
};
