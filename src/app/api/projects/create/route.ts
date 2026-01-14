import { getWorkspaceRole } from "@/utils/getWorkspaceRole";
import { requireRole } from "@/utils/requireRole";
import { NextRequest, NextResponse } from "next/server";
import { projectPolicy } from "../policy";
import { createProject } from "../service";

interface CreateProjectRequestBody {
  userId: string;
  workspaceId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, workspaceId } =
      (await req.json()) as CreateProjectRequestBody;
    const role = await getWorkspaceRole({ userId, workspaceId });
    requireRole(projectPolicy.create, role);
    const project = await createProject({ userId, workspaceId });
    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Error in POST /api/project/create:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
