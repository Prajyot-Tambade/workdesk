import { getWorkspaceRole } from "@/utils/getWorkspaceRole";
import { requireRole } from "@/utils/requireRole";
import { NextRequest, NextResponse } from "next/server";
import { projectPolicy } from "../policy";
import { createDeliverable } from "../service";

interface CreateDeliverableRequestBody {
  userId: string;
  workspaceId: string;
  projectId: string;
  uploadedById: string;
  fileUrl?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, workspaceId, projectId, uploadedById, fileUrl } =
      await req.json();
    const role = await getWorkspaceRole({ userId, workspaceId });
    requireRole(projectPolicy.create, role);
    const deliverable = await createDeliverable({
      workspace: workspaceId,
      project: projectId,
      uploadedBy: uploadedById,
      fileUrl,
    });
    return NextResponse.json(deliverable);
  } catch (error: any) {
    console.error("Error in POST /api/deliverable/create:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
