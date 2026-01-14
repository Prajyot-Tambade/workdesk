import workspaceMember from "@/models/workspaceMemberModel";
import { NextResponse } from "next/server";

export async function getWorkspaceRole({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) {
  try {
    const membership = await workspaceMember.findOne({
      user: userId,
      workspace: workspaceId,
    });
    if (!membership) {
      throw new Error("Access denied!");
    }
    return membership.role;
  } catch (error: any) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
