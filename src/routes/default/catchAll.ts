import type { Request, Response, NextFunction } from 'express';

// 404 catch all
export function catchAll(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  next();
}
