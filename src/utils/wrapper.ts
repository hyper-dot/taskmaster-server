import { NextFunction, Response, RequestHandler } from 'express';
import { IRequestWithUser } from '../types/express';

export const asyncWrapper = (
  handler: (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
): RequestHandler => {
  return async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
};
