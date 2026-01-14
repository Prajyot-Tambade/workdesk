import { NextRequest, NextResponse } from "next/server";
import { createWorkspace, createWorkspaceMember } from "../service";

interface CreateWorkspaceRequestBody {
  userId: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, name } = (await req.json()) as CreateWorkspaceRequestBody;
    const workspace = await createWorkspace({ owner: userId, name });
    await createWorkspaceMember({
      workspace: workspace._id,
      user: userId,
      role: "owner",
    });
    return NextResponse.json(workspace);
  } catch (error: any) {
    console.error("Error in POST /api/project/create:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
