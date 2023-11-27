import { Student } from "../model/database";

let instance: any = null;
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
}

export default Object.freeze(new Helper());
