import userModel from "../models/userController.js";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidStr,
} from "../utils/validatior/validatior.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { jwttoken } from "../utils/jwt/jwt.js";


export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const data = { isDelete: false };
    // name validation--------------------------------------------------------------------------------

    if (!name || !isValidStr(name) || !isValidName(name)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter a valid name" });
    }
    data.name = name;

    // email validation--------------------------------------------------------------------------------
    if (!email || !isValidStr(email) || !isValidEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter a valid email" });
    }
    data.email = email;

    // password validation--------------------------------------------------------------------------------

    if (!isValidStr(password) || !isValidPassword(password)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter a valid password" });
    }
    data.password = password;

    // role validation--------------------------------------------------------------------------------
    const rolearr = [
      "front-end developer",
      "back-end developer",
      "admin",
      "UI-UX Designer",
    ];
    if (!rolearr.includes(role)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter a valid role" });
    }
    data.role = role;
    //hashing  the password---------------------------------------------------------------------------------
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    data.password = hashedPassword; // returning the hashed password ---------------------------------
    const createData = await userModel.create(data);
    if (!createData) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to create user" });
    }
    res.status(201).json({ status: true, message: createData });
  } catch (error) {
    if (error.keyPattern.email) {
      if (error.keyPattern.email === 1) {
        return res
          .status(400)
          .json({ status: false, message: "email already exists in data base" });
      }
    }
    console.log(error)
    return res.status(500).json({ status: false, message: error.message });
  }
};


// login User-------------------------------------------------------------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // email ----------------------------------------------------------------------------------------
    if (!validator.isEmail(email) || !isValidEmail(email)) {
      return res.status(400).json({ status: false, message: "Invalid email" });
    }
    //password validator--------------------------------------------------------------------------------
    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid password" });
    }

    const userlogin = await userModel.findOne({
      email: email,
      isDeleted: false,
    });

    if (!userlogin)
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    //password verifaction-----------------------------------------------------------------------------------
    bcrypt.compare(password, userlogin.password, function (err, passwordMatch) {
      if (err || !passwordMatch) {
        return res
          .status(400)
          .json({ status: false, message: "Passwords do not match" });
      }
      const token = jwttoken(userlogin._id, userlogin.email);
      //console.log(token)
      res.setHeader("x-api-key", token);
      return res.status(200).json({
        status: true,
        message: "User login successfull",
        data: {
          email: userlogin.email,
          token: token,
        },
      });
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};
