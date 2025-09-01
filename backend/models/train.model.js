import mongoose from "mongoose";
import stopSchema from "./stop.model.js";

const trainSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        stops:[stopSchema],
    }
);

const Train = mongoose.model("Train", trainSchema);
export default Train;