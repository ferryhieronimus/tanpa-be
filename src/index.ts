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
import slugify from "slugify";

const app: Express = express();

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

app.get("/", (req, res) => {
  res.send(
    encodeURIComponent(
      slugify(
        "I love you ",
        { lower: true, strict: true }
      )
    )
  );
});

app.use(cors(corsOptions));
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
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  })
);
app.use("/api/v1", router);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

start();
