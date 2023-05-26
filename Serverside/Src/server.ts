import app from "./app";
import env from "./util/ValidEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(port, () => {
      console.log(`server listening on ${port}`);
    });
  })
  .catch(console.error);
