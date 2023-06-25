import { RequestHandler } from "express";
import { authService } from "../services";

const signIn: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await authService.signIn(username, password);

  req.session.username = user.username;

  res.status(200).send({
    status: "success",
    message: "Login success",
    data: {},
  });
};

const signUp: RequestHandler = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  const createdUser = await authService.signUp(
    username,
    password,
    email,
    firstName,
    lastName
  );

  res.status(200).send({
    status: "success",
    message: "Sign up success",
    data: {
      user: createdUser,
    },
  });
};

const controllers = {
  signIn,
  signUp,
};

export default controllers;
