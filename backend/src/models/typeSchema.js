import mongoose, { Schema } from "mongoose";

const typeSchema=new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxLength: 32
    }
});

const Types=mongoose.model("Types",typeSchema);

export default Types;