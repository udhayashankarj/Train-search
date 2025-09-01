import mongoose from "mongoose";

const stopSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        distanceFromPreviousStop:{
            type: Number,
            required: true,
        },
        depatureTime:{
            type:Date,
            required: true,
        },
    }
);
export default stopSchema;