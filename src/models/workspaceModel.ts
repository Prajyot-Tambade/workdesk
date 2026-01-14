import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Workspace =
  mongoose.models.workspaces || mongoose.model("workspace", workspaceSchema);
export default Workspace;
