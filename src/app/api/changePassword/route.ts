import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    // Get token either from header or body
    const token =
      req.headers.get("authorization")?.replace("Bearer ", "") || body.token;

    if (!token) {
      return NextResponse.json({ status: false, message: "No token provided" });
    }

    // Verify JWT
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Find user by email from token payload
    const user = await User.findOne({ userEmail: decoded.email });

    if (!user || !user.resetPasswordToken) {
      return NextResponse.json({
        status: false,
        message: "Invalid token or user not found",
      });
    }

    // Update password
    if (!body.password) {
      return NextResponse.json({ status: false, message: "Password is required" });
    }

    user.userPassword = body.password;
    user.resetPasswordToken = ""; // invalidate token
    await user.save();

    return NextResponse.json({
      status: true,
      message: "Password updated successfully!",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Error in changing password",
    });
  }
}
