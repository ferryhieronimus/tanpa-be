import { RequestHandler } from "express";
import { authService } from "../services";

const signIn: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await authService.signIn(username, password);

  req.session.userId = user.id;

  res.status(200).send({ message: "Login success" });
};

const signUp: RequestHandler = async (req, res) => {
  const data: CreateUserParams = req.body;

  const createdUser = await authService.signUp(data);

  req.session.userId = createdUser.id;

  res.status(200).send({ user: createdUser });
};

const signOut: RequestHandler = async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send({ message: "Unable to log out" });
      } else {
        res.send({ message: "Logout successful" });
      }
    });
  } else {
    res.end();
  }
};

const getCurrentUser: RequestHandler = async (req, res) => {
  const userId = req.session.userId;

  const user = await authService.getCurrentUser(userId);

  if (!user) {
    return res.status(200).json(null);
  }
  return res.status(200).send({ ...user });
};

const updateCurrentUser: RequestHandler = async (req, res) => {
  const userId = req.session.userId;
  const data: UpdateUserParams = req.body;

  const user = await authService.updateCurrentUser(data, userId);

  res.status(200).send({ ...user });
};

const controllers = {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  updateCurrentUser
};

export default controllers;
