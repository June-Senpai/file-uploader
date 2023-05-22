import express, { json } from "express";
// import mongoose from "mongoose";
import multerMiddleWare from "../middlewares/MulterMiddleware.js";
import FileModel from "../models/fileSchema.js";
import fs from "fs";
const router = express.Router();

router.get("/file/list", async (req, res) => {
  let userId = String(req.userData._id).split('"')[0];
  // console.log(userId);
  let files = await FileModel.find({ userId });
  // console.log(files);
  res.json({
    message: "success in sending files",
    response: JSON.parse(JSON.stringify(files)),
  });
});

router.post(
  "/file/upload",
  multerMiddleWare.single("file"),
  async (req, res) => {
    let uploadedFile = req.file;
    let fileName = uploadedFile.filename;
    let userId = req.userData._id;
    let newFile = new FileModel({ userId, fileName });
    await newFile.save();
    res.json({ message: "success in uploading files", response: newFile });
  }
);
router.get("/file/delete/:fileid", async (req, res) => {
  let _id = req.params.fileid;
  let oldFile = await FileModel.findOne({ _id });
  let filePath = `public/uploads/${oldFile.fileName}`;
  fs.unlinkSync(filePath);
  await FileModel.deleteOne({ _id });
  res.send("handling post requests...");
});
router.get("/file/:fileid", async (req, res) => {
  let _id = req.params.fileid;
  let oldFile = await FileModel.findOne({ _id });
  let downloadUrl = `public/uploads/${oldFile.fileName}`;
  // const file = `${__dirname}/public/uploads/${oldFile.fileName}`;
  res.download(downloadUrl);
});

export { router as uploadRouter };
