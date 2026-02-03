import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connect } from "@/db/dbConfig";
import { cache } from "react";

type JwtPayload = {
  id: string;
};

export type userType = {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
};

export const getCurrentUser = cache(async () => {
  connect();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    const userDoc = await User.findById(decoded.id)
      .select("_id username email avatar")
      .lean<userType>();

    if (!userDoc) return null;

    const user: userType = {
      _id: userDoc._id.toString(),
      username: userDoc.username,
      email: userDoc.email,
      avatar: userDoc.avatar,
    };

    return user;
  } catch (error: any) {
    // throw new Error(error.message);
    console.error(error);
  }
});
