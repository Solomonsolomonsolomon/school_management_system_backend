import { CustomError } from "../middleware/decorators";
import cron from "node-cron";
import express from "express";
import { AcademicYear } from "../model/database";
class AcademicYearController {
  /**
   * addAcademicYear
   */
  public addAcademicYear(req: express.Request, res: express.Response) {
    cron.schedule("1 * * * *", () => {
      console.log("hello");
    });
  }
}
