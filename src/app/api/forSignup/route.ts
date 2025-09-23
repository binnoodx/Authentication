import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";
import { sendEmail } from "@/app/helpers/mailer";

export async function POST(req: NextRequest) {
    await dbConnect()

    try {
        const body = await req.json()
        const userName = body.userName
        const userEmail = body.userEmail
        const userPassword = body.userPassword
        const userOTP = Math.floor(111111 + Math.random() * 999999)
        const searchUser = await User.findOne({ userEmail:userEmail })


        if (!searchUser) {
            const newUser = new User({
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userJoined:Date.now(),
                userOTP:userOTP,
                userOTPExpiry:Date.now() + 2*60*1000
            })

            await newUser.save()

            await sendEmail({email:userEmail , otp:userOTP , isVerify:true})
            return NextResponse.json({
                status:true,
                message: "User Registered Successfully"
            })
        }
        else {
            return NextResponse.json({
                status:false,
                message: "Email Already on Use"
            })
        }

    } catch (error) {

        console.log("The Error is" , error)

        return NextResponse.json({
            message:"Error on Signing Up",
            status:false
        })

    }



}