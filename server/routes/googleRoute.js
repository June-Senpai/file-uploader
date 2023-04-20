import express from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/userSchema.js";
import passport from "../config/passport.js";
const router = express.Router();

router.get(
  "/google/signin",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  async function (req, res) {
    console.log(req.user);
    let username = req.user.profile.displayName;
    let email = req.user.profile._json.email;
    let access_token = req.user.access_token;
    let refresh_token = req.user.refresh_token;
    let unique_id = uuidv4();

    try {
      let oldUser = await UserModel.findOne({ email });
      if (oldUser) {
        console.log("passed 1", oldUser);
        let oldUpdatedUser = await UserModel.updateOne(
          {
            email,
          },
          {
            $set: {
              loggedInState: true,
              unique_id,
            },
          }
        );
      } else {
        console.log("passed 2");
        let newUsers = new UserModel({
          username,
          email,
          access_token,
          refresh_token,
          unique_id,
          loggedInState: true,
        });
        await newUsers.save();
      }
      let user = await UserModel.findOne({ email });
      res.cookie("fileUploaderuuid", unique_id, { signed: true });
      res.cookie("fileUploaderUserEmail", email, { signed: true });
      res.status(200).redirect("http://localhost:5173/?signedin=1");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "internal server error" });
    }
  }
);

router.get("/login/status", async (req, res) => {
  try {
    console.log(req.headers);
    let unique_id = req.signedCookies.fileUploaderuuid;
    // cookie.fileUploaderuuid;
    let email = req.signedCookies.fileUploaderUserEmail;
    console.log({ email });
    console.log({ unique_id });
    // cookie.fileUploaderUserEmail;
    let user = await UserModel.findOne({ email });
    if (user && user.unique_id === unique_id) {
      await UserModel.updateOne(
        { email },
        {
          $set: {
            loggedInState: true,
          },
        }
      );
      res.status(200).json({ message: "login successful", response: user });
    } else if (user) {
      await UserModel.updateOne(
        { email },
        {
          $set: {
            loggedInState: false,
          },
        }
      );
      res.status(200).json({ message: "login failed,try again" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
});
export { router as googleRouter };
