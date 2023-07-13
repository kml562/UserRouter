import postModel from "../models/postModel";
import { isValid, isValidStr } from "../utils/validatior/validatior.js";

// create qusetion-----------------------------------------------------------------------------------
export const addPost = async (req, res) => {
  try {
    const question = req.body;

    // question ----------------------------------------------------------------------------------------
    if (!isValidStr(question)) {
      return res
        .status(400)
        .json({ status: false, message: "please enter a valid question" });
    }

    const data = await postModel.create({
      question: question,
      userId: request.params.userId,
      isDeleted: false,
    });
    if (!data) {
      return res
        .status(400)
        .json({ status: false, message: "enter a valid question" });
    }
    return res
      .status(201)
      .json({ status: true, message: "successfully created", data: data });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

// update qusetion-----------------------------------------------------------------------------------

export const updatePost = async (req, res) => {
  try {
    let { qustionId, question } = req.body;

    // qustionId validation-------------------------------------------------------------------
    if (!isValid(qustionId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Qustion ID" });
    }

    // qustionId ----------------------------------------------------------------------------
    if (!isValidStr(question)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Qustion" });
    }

    const finddata = await postModel
      .findById(qustionId)
      .where("isDeleted")
      .equals(false);

    if (!finddata) {
      return res.status(400).json({ status: false, message: "user not found" });
      };



    const updatedata = await postModel.findByIdAndUpdate(
      qustionId,
      { question },
      { new: true }
    );

    if (updatedata.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Invaid update data" });
    }

    return res.status(200).json({
      status: true,
      message: "successfully updated data",
      data: updatedata,
    });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.error.message });
  }
};

// Delete Post -----------------------------------------------------------------------------------
export const DeletePost = async (req, res) => {
    try {
      let { qustionId, question } = req.body;
  
      // qustionId validation-------------------------------------------------------------------
      if (!isValid(qustionId)) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Qustion ID" });
      }
  
      // qustionId ----------------------------------------------------------------------------
      if (!isValidStr(question)) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Qustion" });
      }
  
      const finddata = await postModel
        .findById(qustionId)
        .where("isDeleted")
        .equals(false);
  
      if (!finddata) {
        return res.status(400).json({ status: false, message: "user not found" });
        };
  
  
  
      const updatedata = await postModel.findByIdAndUpdate(
        qustionId,
        { isDeleted:true},
        { new: true }
      );
  
      if (updatedata.length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Invaid update data" });}
  
      return res.status(200).json({
        status: true,
        message: "successfully updated data",
        data: updatedata,    });
        
    } catch (error) {
      return res.status(500).json({ status: false, error: error.message });
    }
  };