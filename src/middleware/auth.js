import jwt from "jsonwebtoken";
import userModel from "../models/userController";
import { isValid } from "../utils/validatior/validatior";

export const authentication = (req, res, next) => {
  try {
    const headers = req.headers["x-api-key"];
    const { JWT_SECRET } = process.env;
    if (!headers) {
      return res.status(400).json({ status: false, msg: "header is required" });
    }

    jwt.verify(headers, JWT_SECRET, (error, token) => {
      if (error) {
        return res.status(401).json({ msg: error.message });
      } else {
        req.decodedToken = token;
        console.log(req.decodedToken);
        // set tokin in req --------------------------------------------------------------------------------------
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({ status: true, msg: error.message });
  }
};

export const adminAuthentication = async (req, res, next) => {
  try {
    const userID = req.params.userID;

    if (!isValid(userID)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user id" });
    }

    const user = await userModel.findById(userID);

    // Check if the user is an admin-------------------------------------------------------
    if (user && user.role === "admin") {
      // User is an admin, allow the request to proceed-------------------------------------
      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "You are not an admin" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, messages: error.message });
  }
};
