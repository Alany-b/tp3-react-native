import { model, Schema } from "mongoose";

const NotesSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      maxlength: [50, "El limite de caracteres es de 50"],
      trim: true,
      lowercase: true,
      required: true,
    },
    content: {
      type: String,
      minlength: [10, "El minimo de caracteres es de 10"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const NotesModel = model("Notes", NotesSchema);
