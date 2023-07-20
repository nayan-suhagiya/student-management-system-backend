import { Request, Response } from "express";
import { ResponseModel } from "../model/respose.model";
import { studentModel } from "../model/student.model";

let responseModel = new ResponseModel();

const addStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const stud: any = new studentModel(data);

    const studid = await stud.generateStudId();
    const password = await stud.generatePassword();

    await stud.save();

    responseModel.message = "Student data added!";
    responseModel.status = 200;
    responseModel.data = [stud];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to add!";
    responseModel.status = 400;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

export { addStudent };
