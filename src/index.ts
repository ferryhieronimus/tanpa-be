import "express-async-errors";
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import router from "./routes";
import middlewares from "./middlewares";
import redisStore from "./configs/redis";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import cors from "cors";

const app: Express = express();

dotenv.config();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
]

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
}

app.use(cors(options));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "alphalemon",
    name: "session",
    cookie: {
      secure: true, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: parseInt(process.env.COOKIES_MAX_AGE!),
    },
  })
);
app.use("/api/v1", router);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8000;

const start = async () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at ${port}`);
  });
};

start();
