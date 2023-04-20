import UserModel from "../models/userSchema.js";
// require("./models/userSchema.js");

const authentication = async (req, res, next) => {
  let unique_id = req.signedCookies.fileUploaderuuid;
  let existingUser = await UserModel.findOne({ unique_id });

  if (existingUser) {
    req.userData = existingUser;
    next();
  } else {
    // await UserModel.updateOne({ unique_id });
    res.status(401).json({ message: "user is unauthenticated" });
  }
};

export default authentication;
