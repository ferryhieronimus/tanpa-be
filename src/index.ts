import 'express-async-errors';
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import router from './routes';
import middlewares from './middlewares';
import redis from './configs/redis';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(morgan("tiny"));
app.use('/api', router)

app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoints)

const port = process.env.PORT;

const start = async () => {
  await redis.connect();
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

start()