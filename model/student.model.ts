import { Schema, model } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

interface StudentInterface {
  username: string;
  firstname: string;
  middlename: string;
  surname: string;
  bdate: string;
  gender: string;
  mobile: string;
  email: string;
  password: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  tokens: [];
}

const studentSchema = new Schema<StudentInterface>(
  {
    username: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 7,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    bdate: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    mobile: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Please enter valid email!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 8,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

studentSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, "SECRET_KEY_FOR_AUTH_TOKEN");
  this.tokens = await this.tokens.concat({ token });
  await this.save();
  return token;
};

const studentModel = model<StudentInterface>("student", studentSchema);

export { studentModel };
