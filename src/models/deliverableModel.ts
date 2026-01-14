import mongoose from "mongoose";

const deliverableSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.ObjectId,
      ref: "workspaces",
      required: true,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "projects",
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    fileUrl: String,
    status: {
      type: String,
      enum: ["Pending Review", "Approved", "Rejected"],
      default: "Pending Review",
    },
  },
  { timestamps: true }
);

const Deliverable =
  mongoose.models.deliverables ||
  mongoose.model("deliverables", deliverableSchema);
export default Deliverable;
