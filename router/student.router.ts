import express from "express";
import {
  addFeesDetails,
  getFeesDetails,
  getProfile,
} from "../controller/student.controller";
import { auth } from "../middleware/auth.middleware";

const studentRouter = express.Router();

studentRouter.get("/student/get-profile/:username", auth, getProfile);

studentRouter.get("/student/get-fees-details", auth, getFeesDetails);
studentRouter.post("/student/add-fees-details", auth, addFeesDetails);

export { studentRouter };
