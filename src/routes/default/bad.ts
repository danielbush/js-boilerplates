import { Router } from 'express';

const bad = Router();
bad.route('/uncaught').get((req, res) => {
  // This may actually be caught by express...
  throw new Error('uncaught throw');
});
bad.route('/caught').get((req, res, next) => {
  next(new Error('caught throw'));
});
bad.route('/uncaught-reject').get((req, res) => {
  Promise.reject(new Error('uncaught rejection'));
});

export { bad };
