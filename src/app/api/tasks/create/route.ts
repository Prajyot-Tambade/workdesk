import { getWorkspaceRole } from "@/utils/getWorkspaceRole";
import { requireRole } from "@/utils/requireRole";
import { NextRequest, NextResponse } from "next/server";
import { projectPolicy } from "../policy";
import { createTask } from "../service";

interface CreateTaskRequestBody {
  userId: string;
  workspaceId: string;
  projectId: string;
  title: string;
  assignedTo: string;
  dueDate?: string | Date;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, workspaceId, projectId, title, assignedTo, dueDate } =
      (await req.json()) as CreateTaskRequestBody;
    const role = await getWorkspaceRole({ userId, workspaceId });
    requireRole(projectPolicy.create, role);
    const task = await createTask({
      workspace: workspaceId,
      project: projectId,
      title,
      assignedTo,
      dueDate,
    });
    return NextResponse.json(task);
  } catch (error: any) {
    console.error("Error in POST /api/task/create:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
