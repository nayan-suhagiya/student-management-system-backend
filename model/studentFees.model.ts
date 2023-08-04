import mongoose, { ObjectId, Schema, model } from "mongoose";

interface studentFeesInterface {
  totalFees: number;
  paidFees: number;
  remainFees: number;
  userId: ObjectId;
}

const studentFeesSchema = new Schema<studentFeesInterface>(
  {
    totalFees: {
      type: Number,
      required: true,
    },
    paidFees: {
      type: Number,
      required: true,
    },
    remainFees: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentModel",
    },
  },
  {
    versionKey: false,
  }
);

const studentFeesModel = model<studentFeesInterface>(
  "student-fees",
  studentFeesSchema
);

export { studentFeesModel };
