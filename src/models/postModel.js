import mongoose from "mongoose"; 


const { Schema, model } = mongoose;

const postSchema = new Schema(
    {  
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
          },
        question: {
            type: String,
            required: true,
        },
        answer: [{
            type: String,
        }],
        isDeleted: {
            type: Boolean,
            default:false,
           } },
    { timestamps: true }
);


const postModel = model("Post", postSchema);
export default postModel;