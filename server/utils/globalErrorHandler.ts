import express, { NextFunction } from "express";
import { event } from "./helper";
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
  res.on("finish", () => {
    console.error(`Error occured:${err.message} at ${req.method} ${req.url}`);
    event.emit(
      "log",
      `ERRLOG${Date.now().toFixed(5)} ${req.ip} ${req.method} ${req.url} ${
        err?.statusCode || 500
      } ${err.message} `,
      "errLog.txt"
    );
  });

  return res.status(err?.statusCode || 500).json({
    status: err?.statusCode || 500,
    msg: err?.message || "internal server error",
    error: err,
  });
}
export default asyncErrorHandler;
