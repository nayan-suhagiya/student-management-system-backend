import { Schema, model } from "mongoose";
import validator from "validator";

interface StudentInterface {
  studid: string;
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
    studid: {
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

studentSchema.methods.generateStudId = async function () {
  const randomNumber = await Math.floor(Math.random() * (999 - 100) + 100);
  const studId = "STUD" + randomNumber;
  this.studid = studId;
  return studId;
};

studentSchema.methods.generatePassword = async function () {
  const first3 = this.firstname.slice(0, 3);
  const second5 = this.mobile.slice(5);
  const passWord = await (first3 + second5).toUpperCase();
  this.password = passWord;
  return passWord;
};

const studentModel = model<StudentInterface>("student", studentSchema);

export { studentModel };
