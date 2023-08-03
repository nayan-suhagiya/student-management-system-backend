import express from "express";
import { auth } from "../middleware/auth.middleware";
import {
  addFees,
  addNotice,
  addStudent,
  deleteStudent,
  getAllStudentData,
  getFees,
  getNotice,
  updateFees,
  updateStudent,
} from "../controller/admin.controller";
const adminRouter = express.Router();

adminRouter.post("/admin/add-student-data", auth, addStudent);
adminRouter.get("/admin/get-all-student-data", auth, getAllStudentData);
adminRouter.patch("/admin/update-student-data/:username", auth, updateStudent);
adminRouter.delete("/admin/delete-student-data/:username", auth, deleteStudent);

adminRouter.post("/admin/add-notice", auth, addNotice);
adminRouter.get("/get-notice", auth, getNotice);

// adminRouter.post("/admin/add-fees", auth, addFees);
adminRouter.get("/admin/get-fees", auth, getFees);
adminRouter.patch("/admin/update-fees", auth, updateFees);

export { adminRouter };
