import { Request } from "express";
//extending Reqest object in express
export {};
declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
     