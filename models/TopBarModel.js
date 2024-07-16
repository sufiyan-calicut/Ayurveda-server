import mongoose from "mongoose";

const topBarSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isBlocked:false
},{timestamps:true});

export const TopBarDB = mongoose.model('TopBar',topBarSchema);