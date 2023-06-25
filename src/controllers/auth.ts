import { RequestHandler } from "express";
import { authService } from "../services";

const signIn: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const token = await authService.signIn(username, password);

  res.status(200).send({
    status: "success",
    message: "Login success",
    data: {
      token: token,
    },
  });
};

const signUp: RequestHandler = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  await authService.signUp(username, password, email, firstName, lastName);

  res.status(200).send({
    status: "success",
    message: "Sign up success",
  });
};

const controllers = {
  signIn,
  signUp,
};

export default controllers;
