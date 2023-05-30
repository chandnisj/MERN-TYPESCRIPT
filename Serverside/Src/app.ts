import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import userRoutes from "./routes/user";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/ValidEnv";
import MongoStore from "connect-mongo";
const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),  
  })
);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(createHttpError(400, "Endpoint not Found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
