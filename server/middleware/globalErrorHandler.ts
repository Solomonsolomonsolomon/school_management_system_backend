import express, { NextFunction } from "express";
const asyncErrorHandler =
  (
    fn: (
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  (req: express.Request, res: express.Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));

export async function ErrorHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(`Error occured:${err.message}`);
  res.status(err?.status || 500).json({
    status: err?.status || 500,
    msg: err?.message || "internal server error",
    error: err,
  });
}
export default asyncErrorHandler;
