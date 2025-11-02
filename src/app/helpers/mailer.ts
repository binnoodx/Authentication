import nodemailer from 'nodemailer';
import User from '../model/userSchema';

interface req {
    email: string,
    otp: Number,
    isVerify: Boolean
}

export const sendEmail = async ({ email, otp, isVerify }: req) => {
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
            html: isVerify ? `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify that its you</title>
</head>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

    body {
        margin: 0;
        padding: 0;
    }




    .main {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        gap: 4px;
        justify-content: start;
        align-items: center;
        background-color: rgb(173, 177, 180);
    }

    .otp {
        padding-inline: 10px;
        background-color: gray;
        color: white;
    }

    body {
        font-family: "Roboto Condensed", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
    }
    .otp{
        padding: 10px 15px;
        background-color: rgb(187, 182, 182);
        letter-spacing: 3px;
        color: black;
        
    }
</style>

<body>

    <div class="main">
        <h1>WebAuth - Your ReadyMade Authentication WebApp</h1>
        <h3>Verify that its you</h3>
        <h3>Use the below 6-digit code to Verify Yourself</h3>
        <h1 class="otp">${otp}</h1>





    </div>


</body>

</html>` : `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify that its you</title>
</head>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

    body {
        margin: 0;
        padding: 0;
    }




    .main {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        gap: 4px;
        justify-content: start;
        align-items: center;
        background-color: rgb(173, 177, 180);
    }

    .otp {
        padding-inline: 10px;
        background-color: gray;
        color: white;
    }

    body {
        font-family: "Roboto Condensed", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
    }
    .otp{
        padding: 10px 15px;
        background-color: rgb(187, 182, 182);
        letter-spacing: 3px;
        color: black;
        
    }
</style>

<body>

    <div class="main">
        <h1>WebAuth - Your ReadyMade Authentication WebApp</h1>
        <h3>Verify that its you</h3>
        <h3>Use the below 6-digit code to Reset Your Password</h3>
        <h1 class="otp">${otp}</h1>





    </div>


</body>

</html>`
        }


        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}