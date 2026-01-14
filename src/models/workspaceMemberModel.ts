import mongoose from "mongoose";

const workspaceMemberSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.ObjectId,
      ref: "workspace",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "freelancer", "team", "client"],
      required: true,
    },
  },
  { timestamps: true }
);

const WorkspaceMember =
  mongoose.models.workspaceMembers ||
  mongoose.model("workspaceMembers", workspaceMemberSchema);
export default WorkspaceMember;
