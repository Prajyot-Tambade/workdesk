import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, avatar } = await req.json();

    const user = await User.findOne({ email });

    if (user)
      return NextResponse.json(
        { error: "User already exits" },
        { status: 409 },
      );

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      avatar: avatar,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Verification Email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id }); 

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
