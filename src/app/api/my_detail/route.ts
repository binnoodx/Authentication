import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";

export async function POST(req: NextRequest) {

    await dbConnect()
    const request =await req.json()
    const token = await request.token


    if (token == "") {
        return NextResponse.json({
            status: false,
            message: "Session Expires. PLease Login Again."
        })
    }
    else {
        const user: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        const userID = user.id

        const searchUser = await User.findOne({_id:userID})


        if(searchUser){
            return NextResponse.json({
            status:true,
            message:"Token Successfully Found",
            userID,
            userEmail:searchUser.userEmail,
            userName:searchUser.userName

            

        })
        }
        else{
            return NextResponse.json({
            status:false,
            message:"Token Not Found",
        })
        }
    }




}