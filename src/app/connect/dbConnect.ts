import mongoose from "mongoose";

export async function dbConnect() {

    try {

        mongoose.connect("mongodb://localhost:27017/webAuth")
        const connection = mongoose.connection
        connection.on("connect",()=>{
            console.log("Database Connected Successfully !")

        })

        connection.on("error",(error)=>{
            console.log("Something ran error after connection!" , error)
        })
        
    } catch (error) {

        console.log("Something ran error in Database" , error);
        
        
    }
    
}