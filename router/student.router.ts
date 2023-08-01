import express from "express";
import { getProfile } from "../controller/student.controller";
import { auth } from "../middleware/auth.middleware";

const studentRouter = express.Router();

studentRouter.get("/student/get-profile/:username", auth, getProfile);

export { studentRouter };
