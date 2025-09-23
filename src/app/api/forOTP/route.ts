import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {

    try {

        await dbConnect()
        const body = await req.json()
        const userOTP = await body.otp

        const findUser = await User.findOne({ userOTP })

        if (findUser) {
            if (Date.now() > findUser.userOTPExpiry) {
                return NextResponse.json({
                    message: "Your OTP has been Expired , Generate New One",
                    status: false
                })

            }
            else {

                findUser.userOTP = ""
                findUser.isVerified = true
                findUser.userOTPExpiry = undefined
                await findUser.save()

                console.log(findUser._id)

                const tokenData = {
                    id: findUser._id,
                    userName: findUser.userName,
                    email: findUser.userEmail
                }
                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
                    expiresIn: "5d"

                })
                const response = NextResponse.json({
                    token: token,
                    message: "User Verified Successfully !",
                    status: true
                })
                response.cookies.set("token", token, {
                    httpOnly: true
                })
                return response
            }
        }
        else {
            return NextResponse.json({
                message: "Invalid OTP",
                status: false
            })
        }


    } catch (error) {

        return NextResponse.json({
            message: "Error in Verifying OTP",
            status: false
        })

    }



}