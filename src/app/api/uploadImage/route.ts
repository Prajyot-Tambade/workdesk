import { useAuthStore } from "@/store/authStore";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export async function POST(image: File) {
  if (!image) {
    return NextResponse.json({ error: "File not found" }, { status: 400 });
  }
  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "workdesk" },
          (error, result) => {
            if (error) reject(error);
            resolve(result as CloudinaryUploadResult);
          },
        );
        uploadStream.end(buffer);
      },
    );
    console.log(result);
    
    return NextResponse.json({ imageUrl: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error while uploading image", error);
  }
}
