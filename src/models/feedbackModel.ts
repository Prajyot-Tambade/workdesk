import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.ObjectId,
      ref: "workspaces",
      required: true,
    },
    deliverable: {
      type: mongoose.Schema.ObjectId,
      ref: "deliverables",
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback =
  mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);
export default Feedback;
