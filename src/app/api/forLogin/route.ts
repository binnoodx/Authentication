import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/userSchema";
import { dbConnect } from "@/app/connect/dbConnect";
import jwt from "jsonwebtoken"
import { signIn } from "next-auth/react";

export async function POST(req: NextRequest) {

    await dbConnect()

    try {
        const data = await req.json()
        const userEmail = data.userEmail
        const userPassword = data.userPassword
        const searchUser = await User.findOne({ userEmail })
        


        if (!searchUser) {
            return NextResponse.json({
                message: "Email doesn't Exist",
                success: false,
            })
        }
        else {
            const searchUserPass = searchUser.userPassword

            //TODO : Decrypt the hashed Password


            if (searchUserPass === userPassword) {

                const tokenData = {
                    id: searchUser._id,
                    userName: searchUser.userName,
                    email: searchUser.userEmail
                }
                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
                    expiresIn: "5d"

                })
                const response = NextResponse.json({
                    message: "User Logined Successfully !",
                    status: true,
                    token:token
                })
                response.cookies.set("token", token, {
                    httpOnly: true
                })
                return response





            }
            else {
                return NextResponse.json({
                    status: false,
                    message: "Invalid Password"
                })
            }
        }



    } catch (error) {

        return NextResponse.json({
            message: "Something Error in Signup.",
            success: false
        })
    }
}