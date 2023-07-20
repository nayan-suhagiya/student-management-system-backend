import { adminModel } from "../model/admin.model";
import { ResponseModel } from "../model/respose.model";
import jwt from "jsonwebtoken";

let responseModel = new ResponseModel();

interface JwtPayload {
  _id: string;
  iat: number;
}

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = (await jwt.verify(
      token,
      "SECRET_KEY_FOR_AUTH_TOKEN"
    )) as JwtPayload;

    // console.log(decode._id);
    // console.log(req.params.id);

    if (req.param.id) {
      if (req.params.id !== decode._id) {
        throw new Error();
      }
      return;
    }

    const user = await adminModel.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    // console.log(user);

    if (!user) {
      responseModel.message = "Search in student";
      responseModel.status = 200;
      responseModel.data = [];

      res.status(200).send(responseModel);
    }

    req.user = user;
    req.token = token;

    next();
    // console.log(token, req.params.id);
  } catch (error) {
    responseModel.message = "Please authenticate";
    responseModel.status = 400;
    responseModel.data = [];
  }
};

export { auth };
