import { Request, Response } from "express";
import { studentModel } from "../model/student.model";
import { ResponseModel } from "../model/respose.model";

let responseModel = new ResponseModel();

const getProfile = async (req: Request, res: Response) => {
  try {
    // res.send(req.params.username);

    const student = await studentModel.findOne(
      { username: req.params.username },
      { _id: 0, createdAt: 0, updatedAt: 0, tokens: 0 }
    );

    if (!student) {
      responseModel.message = "Student not found!";
      responseModel.status = false;
      responseModel.data = [];

      res.status(404).send(responseModel);
      return;
    }

    responseModel.message = "Data fetched!";
    responseModel.status = true;
    responseModel.data = [student];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to get data!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(404).send(responseModel);
  }
};

export { getProfile };
