import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {

    try {

        await dbConnect()
        const body = await req.json()
        const userOTP = await body.otp
     

        const findUser = await User.findOne({ forgetOTP: userOTP })

        if (findUser) {
            if (Date.now() > findUser.forgetOTPExpiry) {
                return NextResponse.json({
                    message: "Your OTP has been Expired , Generate New One",
                    status: false
                })

            }
            else {
                
                const token_uuid = uuidv4()
                findUser.resetPasswordToken = token_uuid
                findUser.forgetOTP = ""
                findUser.forgetOTPExpiry = undefined
                await findUser.save()


                const tokenData = {
                    email: findUser.userEmail,
                }
                const tokenSentForReset = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
                    expiresIn: "10m"
                })
                const response = NextResponse.json({
                    token: tokenSentForReset,
                    message: "User Verified Successfully !",
                    status: true
                })
                response.cookies.set("tokenSentForReset", tokenSentForReset, {
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
}
    catch (error) {
        
        return NextResponse.json({
            message: "Error in Verifying OTP",
            status: false
        })
        
    }
    
}


