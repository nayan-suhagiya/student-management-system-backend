import express from "express";
import bodyParser from "body-parser";
import dbconfig from "../db/dbconfig.config";

//import router
import { loginRouter } from "../router/login.router";
import { adminRouter } from "../router/admin.router";

//config
dbconfig();
const app = express();
const PORT = process.env.PORT || 3000;

//bodyparser user
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Router declaration
app.use(loginRouter);
app.use(adminRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
