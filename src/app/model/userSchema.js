import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userDeviceId: {
        type: String,
    },
    userName: {
        type: String,
    },
    userEmail: {
        type: String
    },
    userPassword: {
        type: String
    },
    userJoined: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userOTP: {
        type: Number
    },
    userVerifyToken:{

    },
    userOTPExpiry: {
        type: Date
    },
    forgetOTP: {
        type: String
    },
    forgetOTPExpiry: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    }


})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
