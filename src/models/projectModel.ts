import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.ObjectId,
      ref: "workspaces",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    projectLogo: String,
    description: String,
    status: {
      type: String,
      enum: ["In Progress", "Client Review", "Completed"],
      default: "In Progress",
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    deadline: Date,
  },
  { timestamps: true }
);

const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);
export default Project;
