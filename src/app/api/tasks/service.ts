import taskModel from "@/models/taskModel";

export async function createTask(data: {
  workspace: string;
  project: string;
  title: string;
  assignedTo: string;
  dueDate?: string | Date;
}) {
  return taskModel.create(data);
}
