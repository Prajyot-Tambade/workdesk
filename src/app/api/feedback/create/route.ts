import { getWorkspaceRole } from "@/utils/getWorkspaceRole";
import { requireRole } from "@/utils/requireRole";
import { NextRequest, NextResponse } from "next/server";
import { projectPolicy } from "../policy";
import { createFeedback } from "../service";

interface CreateFeedbackRequestBody {
  userId: string;
  workspaceId: string;
  deliverableId: string;
  authorId: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, workspaceId, deliverableId, authorId, message } =
      (await req.json()) as CreateFeedbackRequestBody;
    const role = await getWorkspaceRole({ userId, workspaceId });
    requireRole(projectPolicy.create, role);
    const feedback = await createFeedback({
      workspace: workspaceId,
      deliverable: deliverableId,
      author: authorId,
      message,
    });
    return NextResponse.json(feedback);
  } catch (error: any) {
    console.error("Error in POST /api/feedback/create:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
