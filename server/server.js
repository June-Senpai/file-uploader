import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import passport from "passport";
import cookieParser from "cookie-parser";
import { uploadRouter } from "./routes/fileHandling.js";
import { googleRouter } from "./routes/googleRoute.js";
import authentication from "./middlewares/authentication.js";
import "./config/db.js";
import passport from "./config/passport.js";
import session from "express-session";
dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

// passportConfig();

// app.use(passport.initialize());
app.use(session({ secret: "mosquito" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
var allowedList = [
  "http://localhost:4001",
  "http://localhost:5173",
  "http://localhost",
];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (allowedList.includes(req.header("Origin"))) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
app.use(express.static("public"));

// require("./models/fileSchema.js");
// require("./models/userSchema.js");

// app.use(require("./routes/googleRoute.js"));
// app.use(require("./middlewares/authentication.js"));
// app.use(require("./routes/fileHandling.js"));

import "./models/fileSchema.js";
import "./models/userSchema.js";

app.use(googleRouter);
app.use(authentication);
app.use(uploadRouter);

app.use("/", (req, res) => {
  res.send("welcome to file uploader");
});
app.listen(port, () =>
  console.log(`server started on http://localhost:${port} `)
);
