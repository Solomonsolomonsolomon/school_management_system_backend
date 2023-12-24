let instance: any = null;
import EventEmitter from "events";
import { Response,Request,NextFunction } from "express";
import fs, { promises as fsPromises } from "fs";
import path from "path";
class Helper {
  constructor() {
    if (!instance) instance = this;
    return instance;
  }
  public async paginate(
    Model: any,
    totalAmount: number,
    filter: any,
    sort: any,
    pageSize: number,
    page: number,
    populate: any,
    select: any
  ) {
    const skip = (page - 1) * pageSize;
    const totalPages = Math.ceil(totalAmount / pageSize);
    let model = await Model.find(filter)
      .sort(sort ? sort : {})
      .skip(skip)
      .limit(pageSize)
      .populate(populate ? populate : "")
      .select(select ? select : "");

    if (!model.length) throw new Error("Not found");
    return {
      model,
      page,
      totalPages,
    };

    //   .then((student: any) => {
    //     if (student.length < 1) throw new Error("No student found");
    //     return {
    //       student,
    //       page,
    //       totalPages,
    //     };
    //   });
  }
  public async log(message: string, fileName: string) {
    let timestamp = JSON.stringify(new Date()).split("T").join(" ");
    const logItem: string = `LOGID${Date.now()} ${timestamp} ${message} \n`;
    if (!fs.existsSync(path.join(__dirname, "../logs"))) {
      await fsPromises
        .mkdir(path.join(__dirname, "../logs"))
        .catch((error: any) => console.log(error));
    }
    await fsPromises
      .appendFile(path.join(__dirname, "../logs", fileName), logItem)
      .catch((err: any) => console.error(err));
  }
  public  requestLogger(req:Request, res:Response, next:NextFunction) {
  let start = process.hrtime();
  let timeStart = Date.now();

  res.on("finish", function () {
    let ping = process.hrtime(start);
    let duration = Date.now() - timeStart;
    event.emit(
      "log",
      `${req.ip} ${req.method} ${req.url} ${res.statusCode} ${
        ping[0] * 1e6 + ping[1] / 1e9
      }s  
      ${duration}ms
      `,
      "reqLog.txt"
    );
  });

  next();
}
}
export default Object.freeze(new Helper());
class Emitter extends EventEmitter {}
let event = new Emitter();
event.on("log", (msg, file) => new Helper().log(msg, file));
export { event };
