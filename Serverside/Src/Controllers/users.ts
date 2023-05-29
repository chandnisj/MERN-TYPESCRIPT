import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../Models/user";
import bcrypt from "bcrypt";
interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const SignUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Parameters Missing");
    }
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken.please choose a different one or log in instead!."
      );
    }
    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "Email is already taken..");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser =await  UserModel.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
