import projectModel from "@/models/projectModel";

export async function createProject(data: {
  userId: string,
  workspaceId: string,
}) {
  return projectModel.create(data);
}
