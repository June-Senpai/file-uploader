import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);
const FileModel = mongoose.model("file", FileSchema);
export default FileModel;
