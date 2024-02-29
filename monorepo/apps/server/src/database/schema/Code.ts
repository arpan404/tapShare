import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    userID: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
    },
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    vscode: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
schema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const Code = mongoose.model("Code", schema);
export default Code;
