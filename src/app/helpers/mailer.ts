import nodemailer from 'nodemailer';
import User from '../model/userSchema';

interface req{
    email:string,
    otp:Number,
    isVerify:Boolean
}

export const sendEmail = async({email,otp,isVerify}:req) => {
    try {

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d5efc0603c6faf",
              pass: "0546719af64a2d"
              //TODO: add these credentials to .env file
            }
          });
        const mailOptions = {
            from: 'noreply@web_auth.com',
            to: email,
            subject: isVerify ? "Verify that its you - WebAuth" : "Reset Your Password.",
            html: isVerify ? `<p>Your Verification code is ${otp}</p>` : `<p>Your Reset Password code is ${otp}</p>`     
        }


        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}