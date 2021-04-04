process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import express from 'express';
import type { Request, Response } from 'express';
import logger from './logger';
import morgan from './morgan';
import routes from './routes';

const app = express();
app.use(morgan);
routes(app);

app.use((err: Error, req: Request, res: Response) => {
  logger.error(err);
  res.status(500).send('Unexpected error');
});

export default app;
