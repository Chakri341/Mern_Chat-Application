import mongoose from "mongoose";

export const ConnectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Successfully Connected");
    } catch (error) {
        console.log("Error in Connecting DB ", error.message);
        
    }

}