import { Request, Response } from "express";
import { ResponseModel } from "../model/respose.model";
import { studentModel } from "../model/student.model";

let responseModel = new ResponseModel();

const addStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const username = await generateUsername();
    const password = await generatePassword(data.firstname, data.mobile);

    data.username = username;
    data.password = password;
    console.log(data);
    const stud = new studentModel(data);

    // await stud.save();
    await stud.save();

    responseModel.message = "Student data added!";
    responseModel.status = true;
    responseModel.data = [stud];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to add!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const generateUsername = () => {
  const randomNumber = Math.floor(Math.random() * (999 - 100) + 100);
  const username = "STUD" + randomNumber;
  // this.username = username;
  return username;
};

const generatePassword = (firstname, mobile) => {
  const first3 = firstname.slice(0, 3);
  const second5 = mobile.slice(5);
  const passWord = (first3 + second5).toUpperCase();
  // this.password = passWord;
  return passWord;
};

const getAllStudentData = async (req: Request, res: Response) => {
  try {
    const data = await studentModel.find(
      {},
      { _id: 0, createdAt: 0, updatedAt: 0, tokens: 0 }
    );

    responseModel.message = "Data Fetched!";
    responseModel.status = true;
    responseModel.data = data;

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to get data!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(404).send(responseModel);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!data.username) {
      responseModel.message = "Username not found!";
      responseModel.status = false;
      responseModel.data = [];

      res.status(404).send(responseModel);
      return;
    }

    const stud: any = await studentModel.findOneAndUpdate(
      {
        username: data.username,
      },
      data
    );

    responseModel.message = "Student updated!";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to update!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

export { addStudent, getAllStudentData, updateStudent };
