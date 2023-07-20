import express from "express";
import {
  loginUser,
  logoutFromAll,
  logoutUser,
} from "../controller/login.controller";
import { auth } from "../middleware/auth.middleware";
const loginRouter = express.Router();

loginRouter.post("/login", loginUser);
loginRouter.get("/logout/:id", auth, logoutUser);
loginRouter.get("/logout-from-all/:id", auth, logoutFromAll);

export { loginRouter };
