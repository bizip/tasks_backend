import bodyParser from "body-parser";
import session from "express-session";
// import { passport } from "./restfull/routes/authRouters";
import express from "express";
import flash from "connect-flash";
import dotenv from "dotenv";
// import router from "./routes";
import router from "./restfull/routes/index";
import DB from "./database";
import passport from "passport";
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_KEY || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const initializeDatabase = async () => {
  await DB.sequelize.sync({
    force: false,
    alter: process.env.NODE_ENV !== "production",
  });
  // associate();
};

const start = () => {
  try {
    initializeDatabase();
    app.listen({ port: PORT }, () =>
      process.stdout.write(`http://localhost:${PORT} \n`)
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

start();
