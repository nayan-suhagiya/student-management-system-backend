import express from "express";
import { auth } from "../middleware/auth.middleware";
import {
  addStudent,
  deleteStudent,
  getAllStudentData,
  updateStudent,
} from "../controller/admin.controller";
const adminRouter = express.Router();

adminRouter.post("/admin/add-student-data", auth, addStudent);
adminRouter.get("/admin/get-all-student-data", auth, getAllStudentData);
adminRouter.patch("/admin/update-student-data", auth, updateStudent);
adminRouter.delete("/admin/delete-student-data/:username", auth, deleteStudent);

export { adminRouter };
