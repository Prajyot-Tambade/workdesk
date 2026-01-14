import WorkspaceMember from "@/models/workspaceMemberModel";
import Workspace from "@/models/workspaceModel";

export async function createWorkspace(data: { name: string; owner: string }) {
  return Workspace.create(data);
}

export async function createWorkspaceMember(data: {
  workspace: string;
  user: string;
  role: string;
}) {
  return WorkspaceMember.create(data);
}
