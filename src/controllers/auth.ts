import { RequestHandler } from "express";
import { authService } from "../services";

const signIn: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  
  const user = await authService.signIn(username, password);

  req.session.userId = user.id;

  res.status(200).send({
    status: "success",
    message: "Login success"
  });
};

const signUp: RequestHandler = async (req, res) => {
  const data: CreateUserParams = req.body;

  const createdUser = await authService.signUp(data);

  res.status(200).send({
    status: "success",
    message: "Sign up success",
    data: {
      user: createdUser,
    },
  });
};

const getCurrentUser: RequestHandler = async (req, res) => {
  const userId = req.session.userId;

  const user = await authService.getCurrentUser(userId!);

  res.status(200).send({
    status: "success",
    data: {
      user
    },
  });
};

const controllers = {
  signIn,
  signUp,
  getCurrentUser
};

export default controllers;
