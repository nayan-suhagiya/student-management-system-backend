import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

interface AdminInterface {
  username: string;
  password: string;
  tokens: [];
}

const adminSchema = new Schema<AdminInterface>(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 5,
    },
    password: {
      type: String,
      required: true,
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

adminSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, "SECRET_KEY_FOR_AUTH_TOKEN");
  // console.log(token);
  this.tokens = await this.tokens.concat({ token });
  await this.save();
  return token;
};

const adminModel = model<AdminInterface>("admin", adminSchema);

export { adminModel };
