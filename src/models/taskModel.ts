import mongooes from "mongoose";

const taskSchema = new mongooes.Schema(
  {
    workspace: {
      type: mongooes.Schema.ObjectId,
      ref: "workspaces",
      required: true,
    },
    project: {
      type: mongooes.Schema.ObjectId,
      ref: "projects",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: mongooes.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    dueDate: Date,
  },
  { timestamps: true }
);

const Task = mongooes.models.tasks || mongooes.model("tasks", taskSchema);
export default Task;
