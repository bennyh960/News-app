import mongoose from "mongoose";

mongoose
  .connect(
    process.env.NODE_ENV === "production" ? (process.env.MONGO_URI as string) : "mongodb://127.0.0.1:27017/sub-app"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.log("Mongoose connection faild");
    throw new Error(e);
  });
