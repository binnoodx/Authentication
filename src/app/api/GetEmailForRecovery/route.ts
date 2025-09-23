import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";
import { sendEmail } from "@/app/helpers/mailer";

export async function POST(request: NextRequest) {

    await dbConnect()

    try {

        const req = await request.json()

        const userEmail = req.email

        const searchUser = await User.findOne({ userEmail: userEmail })

        if (!searchUser) {
            return NextResponse.json({
                status: false,
                message: "No such Email Found"
            })
        }

        else {
            const userOTP = Math.floor(111111 + Math.random() * 999999)

            searchUser.forgetOTP = userOTP
            searchUser.forgetOTPExpiry = Date.now()+3*60*1000
            searchUser.save()
            sendEmail({email:searchUser.userEmail , isVerify:false , otp:userOTP })

            return NextResponse.json({
                status:true,
                message:"OTP send Successfully"
            })

        }
    } catch (error) {

        return NextResponse.json({
            status: false,
            message: "Error in Recovering Account"
        })

    }





}