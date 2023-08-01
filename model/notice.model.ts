import { Schema, model } from "mongoose";

interface noticeInterface {
  title: string;
  description: string;
}

const noticeSchema = new Schema<noticeInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const noticeModel = model<noticeInterface>("notice", noticeSchema);

export { noticeModel };
