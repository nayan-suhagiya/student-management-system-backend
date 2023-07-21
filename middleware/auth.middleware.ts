import { adminModel } from "../model/admin.model";
import { ResponseModel } from "../model/respose.model";
import jwt from "jsonwebtoken";
import { studentModel } from "../model/student.model";

let responseModel = new ResponseModel();

interface JwtPayload {
  _id: string;
  iat: number;
}

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    const decode = (await jwt.verify(
      token,
      "SECRET_KEY_FOR_AUTH_TOKEN"
    )) as JwtPayload;

    // console.log(token, decode);

    // console.log(decode._id);
    // console.log(req.params.id);

    if (req.params.id) {
      if (req.params.id != decode._id) {
        throw new Error();
      }
    }
    const user = await adminModel.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    // console.log(user);

    if (!user) {
      const studuser = await studentModel.findOne({
        _id: decode._id,
        "tokens.token": token,
      });

      // console.log(studuser);
      if (!studuser) {
        throw new Error();
      }

      req.user = studuser;
      req.token = token;

      next();
      // return;
    } else {
      req.user = user;
      req.token = token;

      next();
    }

    // console.log(token, req.params.id);
  } catch (error) {
    responseModel.message = "Please authenticate";
    responseModel.status = false;
    responseModel.data = [];

    res.status(400).send(responseModel);
  }
};

export { auth };
