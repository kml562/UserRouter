import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailregex.test(email);
        },
        message: "invalid email type",
      },
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["front-end developer", "back-end developer","admit", "UI-UX Designer"]
        },
        isDeleted: {
            type: Boolean,
            default:false,
           }
    },
   
  { timestamps: true }
);

const userModel = model("User", userSchema);
export default userModel;
