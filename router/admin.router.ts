import express from "express";
import { auth } from "../middleware/auth.middleware";
import { addStudent } from "../controller/admin.controller";
const adminRouter = express.Router();

adminRouter.post("/admin/add-student-data", auth, addStudent);

export { adminRouter };
