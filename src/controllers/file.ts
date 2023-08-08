import { RequestHandler } from "express";
import { fileService } from "../services";

const generatePutUrl: RequestHandler = async (req, res) => {
  try {
    const { file_name, file_type } = req.query as any;
    return res.send({
      content: await fileService.generatePutUrl(file_name, file_type),
      message: "Success",
    });
  } catch (error: any) {
    return res.status(400).send({
      msg: error.message,
    });
  }
};

const generateGetUrl: RequestHandler = async (req, res) => {
  try {
    const { key } = req.query as any;
    return res.send({
      content: await fileService.generateGetUrl(key),
      message: "Success",
    });
  } catch (error: any) {
    return res.status(400).send({
      msg: error.message,
    });
  }
};

const controllers = {
  generatePutUrl,
  generateGetUrl,
};

export default controllers;
