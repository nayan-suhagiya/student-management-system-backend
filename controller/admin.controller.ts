import { Request, Response } from "express";
import { ResponseModel } from "../model/respose.model";
import { studentModel } from "../model/student.model";
import { noticeModel } from "../model/notice.model";
import { feesModel } from "../model/fees.model";

let responseModel = new ResponseModel();

const addStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    studentData.username = generateUsername();
    studentData.password = generatePassword(
      studentData.firstname,
      studentData.mobile
    );

    const student = new studentModel(studentData);

    await student.save();

    responseModel.message = "Student added!";
    responseModel.status = true;
    responseModel.data = [student];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to add!";
    responseModel.status = false;
    responseModel.data = [error];

    res.status(400).send(responseModel);
  }
};

const generateUsername = () => {
  const randomNumber = Math.floor(Math.random() * (999 - 100) + 100);
  const username = "STUD" + randomNumber;
  return username;
};

const generatePassword = (firstname, mobile) => {
  const first3 = firstname.slice(0, 3);
  const second5 = mobile.slice(5);
  const passWord = (first3 + second5).toUpperCase();
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
    const username = req.params.username;

    if (!data.username) {
      responseModel.message = "Username not found!";
      responseModel.status = false;
      responseModel.data = [];

      res.status(404).send(responseModel);
      return;
    }

    data.password = generatePassword(data.firstname, data.mobile);

    const findStudent = await studentModel.findOne({ username });

    if (findStudent.username !== data.username) {
      responseModel.message = "Username can't change!";
      responseModel.status = false;
      responseModel.data = [];

      res.status(404).send(responseModel);
      return;
    }

    const stud: any = await studentModel.findOneAndUpdate(
      {
        username: username,
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

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    await studentModel.findOneAndDelete({ username });

    responseModel.message = "Student deleted!";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to delete!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const addNotice = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const notice = new noticeModel(data);

    await notice.save();

    responseModel.message = "Notice Added!";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to add notice!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const getNotice = async (req: Request, res: Response) => {
  try {
    const data = await noticeModel.find({});

    responseModel.message = "Data fetched!";
    responseModel.status = true;
    responseModel.data = data;

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to get notice!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const addFees = async (req: Request, res: Response) => {
  try {
    // res.send(req.body);
    const data = req.body;
    const fees = new feesModel(data);

    await fees.save();

    responseModel.message = "Fees Added!";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to add fees!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const updateFees = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const _id = req.query._id;

    const data = {
      tutionFees: Number(body.tutionFees),
      labFees: Number(body.labFees),
      campusDevelopmentFees: Number(body.campusDevelopmentFees),
      libraryFees: Number(body.libraryFees),
      otherFees: Number(body.otherFees),
      totalFees: Number(body.totalFees),
    };

    await feesModel.findByIdAndUpdate({ _id }, data);

    responseModel.message = "Fees Updated!";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to update fees!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const getFees = async (req: Request, res: Response) => {
  try {
    const data = await feesModel.find({});

    responseModel.message = "Fees Fetched!";
    responseModel.status = true;
    responseModel.data = data;

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to get fees!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

export {
  addStudent,
  getAllStudentData,
  updateStudent,
  deleteStudent,
  addNotice,
  getNotice,
  addFees,
  updateFees,
  getFees,
};
