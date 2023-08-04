import { Request, Response } from "express";
import { studentModel } from "../model/student.model";
import { ResponseModel } from "../model/respose.model";
import { feesModel } from "../model/fees.model";
import { studentFeesModel } from "../model/studentFees.model";

let responseModel = new ResponseModel();

const getProfile = async (req: Request, res: Response) => {
  try {
    // res.send(req.params.username);

    const student = await studentModel.findOne(
      { username: req.params.username },
      { _id: 1, createdAt: 0, updatedAt: 0, tokens: 0 }
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

const getFeesDetails = async (req: Request, res: Response) => {
  try {
    if (!req.query._id) {
      responseModel.message = "Userid not found!Please provide userid!";
      responseModel.status = false;
      responseModel.data = [];

      res.status(404).send(responseModel);
      return;
    }

    const feesData = await studentFeesModel.findOne(
      { userId: req.query._id },
      { _id: 0 }
    );

    // console.log(feesData);

    if (!feesData) {
      const fees = await feesModel.find({}, { totalFees: 1, _id: 0 });
      const totalFees = fees[0].totalFees;

      let feesData = {
        totalFees: Number(totalFees),
        paidFees: 0,
        remainFees: Number(totalFees),
        userId: req.query._id,
      };

      responseModel.message = "Data fetched!";
      responseModel.status = true;
      responseModel.data = [feesData];

      res.status(200).send(responseModel);
    } else {
      responseModel.message = "Data fetched!";
      responseModel.status = true;
      responseModel.data = [feesData];

      res.status(200).send(responseModel);
    }
  } catch (error) {
    responseModel.message = "Unable to get data!";
    responseModel.status = false;
    responseModel.data = [];

    res.status(400).send(responseModel);
  }
};

const addFeesDetails = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const data = req.body;
    const fees = await feesModel.find({}, { totalFees: 1, _id: 0 });
    const totalFees = fees[0].totalFees;
    const remainFees = Number(totalFees) - Number(data.paidFees);

    // console.log(data, totalFees, remainFees);

    const addData = {
      totalFees,
      paidFees: data.paidFees,
      remainFees,
      userId: data.userId,
    };

    const studentFees = new studentFeesModel(addData);
    await studentFees.save();

    responseModel.message = "Data Added!";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to add data!";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

export { getProfile, getFeesDetails, addFeesDetails };
