import { Request, Response } from "express";
import { ResponseModel } from "../model/respose.model";
import { adminModel } from "../model/admin.model";
import { studentModel } from "../model/student.model";

let responseModel = new ResponseModel();

const loginUser = async (req: Request, res: Response) => {
  try {
    const data = await req.body;
    // console.log(data.username, data.password);

    if (data.username == "" || !data.username) {
      responseModel.message = "Please provide username";
      responseModel.status = false;
      responseModel.data = [];

      res.status(400).send(responseModel);
      return;
    }

    if (data.username == "admin") {
      const user: any = await adminModel.findOne({ username: "admin" });

      if (user?.password !== data.password) {
        responseModel.message = "Please check your password";
        responseModel.status = false;
        responseModel.data = [];

        res.status(200).send(responseModel);
        return;
      }

      const token = await user.generateAuthToken();
      // console.log(token);

      responseModel.message = "Login success!";
      responseModel.status = true;
      responseModel.data = [
        {
          _id: user._id,
          username: user.username,
          token,
          isAdmin: true,
        },
      ];

      res.status(200).send(responseModel);
    } else {
      const user: any = await studentModel.findOne({ username: data.username });

      // res.send(user);
      if (!user) {
        responseModel.message = "Unable to found user!";
        responseModel.status = false;
        responseModel.data = [];

        res.status(404).send(responseModel);
        return;
      }

      if (user?.password !== data.password) {
        responseModel.message = "Please check your password";
        responseModel.status = false;
        responseModel.data = [];

        res.status(200).send(responseModel);
        return;
      }

      const token = await user.generateAuthToken();
      // console.log(token);

      responseModel.message = "Login success!";
      responseModel.status = true;
      responseModel.data = [
        {
          _id: user._id,
          username: user.username,
          token,
          isAdmin: false,
        },
      ];

      res.status(200).send(responseModel);
    }
  } catch (error) {
    responseModel.message = "Unable to login";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const logoutUser = async (req, res) => {
  try {
    // console.log("Logout runn");
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    responseModel.message = "Logout Success";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to logout";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

const logoutFromAll = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    responseModel.message = "Logout successfully from all devices";
    responseModel.status = true;
    responseModel.data = [];

    res.status(200).send(responseModel);
  } catch (error) {
    responseModel.message = "Unable to logout";
    responseModel.status = false;
    responseModel.data = [{ error }];

    res.status(400).send(responseModel);
  }
};

export { loginUser, logoutUser, logoutFromAll };
