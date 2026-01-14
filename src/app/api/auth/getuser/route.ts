import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

// export async function POST(request: NextRequest) {
//   const userId = getDataFromToken(request);
//   const user = await User.findOne({ _id: userId });
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 401 });
//   }
//   return NextResponse.json({
//     message: "User found",
//     user: user,
//   });
// }

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error: any) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
