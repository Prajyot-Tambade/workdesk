import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

interface tokenPayloadType {
  id: string
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword) {
      return NextResponse.json(
        { error: "Wrong password" },
        { status: 401 }
      );
    }

    const tokenPayload: tokenPayloadType = {
      id: user._id,
    }

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

    const response = NextResponse.json({
      message: "Logged in success",
      success: true
    })
    response.cookies.set("token", token, {
      httpOnly: true
    })
    console.log(response)
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
