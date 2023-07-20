import { connect } from "mongoose";

export default function dbconfig() {
  connect(
    "mongodb+srv://nayan:abcd@cluster0.obpj3m6.mongodb.net/?retryWrites=true&w=majority"
  )
    .then(() => {
      console.log("DBConnection success");
    })
    .catch((err) => {
      console.log({ message: "Unable to connect", err });
    });
}
