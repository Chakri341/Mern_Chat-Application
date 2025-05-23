import mongoose, { Types } from "mongoose";


const userSchema =mongoose.Schema({

    email :{
        type:String,
        required:true,
        unique:true
    },
    fullName :{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true,
        minlength:6
    },
    profilePic :{
        type:String,
        default:"",
    },

}, {timestamps : true})

const Users =mongoose.model("User", userSchema);

export default Users;