import "express-async-errors";
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import router from "./routes";
import middlewares from "./middlewares";
import redisStore from "./configs/redis";

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(morgan("tiny"));

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "alphalemon",
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  })
);
app.use("/api", router);

app.use(middlewares.errorHandler);
app.use(middlewares.unknownEndpoints);

const port = process.env.PORT || 3000;

const start = async () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

start();
