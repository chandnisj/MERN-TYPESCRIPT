import mongoose from "mongoose";

declare module "express-session" {
  interface Session {
    userId: mongoose.Types.ObjectId;
  }
}
