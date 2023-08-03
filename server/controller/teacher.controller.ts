import { Request, Response } from "express";
import { Teacher,Student } from "../model/database";


export async function getManagedStudents(req: Request, res:Response){
       try {
        await Teacher.findOne({})
       } catch (error) {
        
       }
};
