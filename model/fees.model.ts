import { Schema, model } from "mongoose";

interface feesInterface {
  tutionFees: number;
  labFees: number;
  campusDevelopmentFees: number;
  libraryFees: number;
  otherFees: number;
  totalFees: number;
}

const feesSchema = new Schema<feesInterface>(
  {
    tutionFees: {
      type: Number,
      required: true,
    },
    labFees: {
      type: Number,
      required: true,
    },
    campusDevelopmentFees: {
      type: Number,
      required: true,
    },
    libraryFees: {
      type: Number,
      required: true,
    },
    otherFees: {
      type: Number,
      required: true,
    },
    totalFees: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const feesModel = model<feesInterface>("fees", feesSchema);

export { feesModel };
