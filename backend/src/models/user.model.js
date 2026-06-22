import { Schema, model } from "mongoose";
const User = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const UserModel = model("User", User);
