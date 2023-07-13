import axios from "axios";
import { isValid, isValidStr } from "../utils/validatior/validatior.js";

// create qusetion-----------------------------------------------------------------------------------
export const addProblem = async (req, res) => {
  try {
      const problemData = req.body;
    //  problemData["id"]= req.decodedToken.userId.toString();

    // problemData ----------------------------------------------------------------------------------------
    // if (!isValidStr(problemData)) {
    //   return res
    //     .status(400)
    //     .json({ status: false, message: "please enter a valid problemData" });
    // }
    const { endpoint, accessToken } = process.env;

    axios
      .post(
        `https://${endpoint}/api/v4/problems?access_token=${accessToken}`,
        problemData
      )
      .then((response) => {
        return res.status(response.status).json(response.data); // Return the problem data
      })
      .catch((error) => {
        if (error.response) {
          return res.status(error.response.status).json(error.response.data); // Return the error response from the API
        } else {
          return res
            .status(500)
            .json({ status: false, error: "Internal Server Error" }); // Internal Server Error------
        }
      });

  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

// add test case qusetion-----------------------------------------------------------------------------------

export const addtestcase = async (req, res) => {
  try {
      const problemId = req.params.problemId;
      //console.log(problemId)
      const testcaseData = req.body;
     // testcaseData.id= +req.body.id;
    //   if (!isValid(problemId)) {
    //       return res.status(400).json({ status: false, message: "invalid user ID" });
    // }
      console.log(testcaseData, "delkds;");
      const { endpoint, accessToken } = process.env;
      const response = await axios.post(
      `https://${endpoint}/api/v4/problems/${problemId}/testcases?access_token=${accessToken}`,
      testcaseData
    );

    if (response.status === 201) {
     return  res.status(201).json({status:true, data:response.data}); // Return the testcase data
    }
      
  
      
  } catch (error) {
  
    if (error.response) {
        if (error.response.status === 401) {
          res.status(401).json({ status: false, message: "Unauthorized access" }); // Unauthorized access
        } else if (error.response.status === 403) {
          res.status(403).json({ status: false, message: "Access denied" }); // Access denied
        } else if (error.response.status === 404) {
          res
            .status(404)
            .json({ status: false, message: "Problem does not exist" }); // Problem does not exist
        } else if (error.response.status === 400) {
          res.status(400).json({ status: false, message: "server error" }); // Return the error response from the API
        }
    } else {
        console.log("Connection problem");
        res.status(500).json({ status: false, message: error.message }); // Internal Server Error----------
      }

    
  }
};



// add test case qusetion-----------------------------------------------------------------------------------


export const updateProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const problemData = req.body;

    // problemId validation-------------------------------------------------------------------
    if (!isValid(problemId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Qustion ID" });
    }

    // problemId ----------------------------------------------------------------------------
    if (!isValidStr(problemData)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Qustion" });
    }
    const response = await axios.put(
      `https://${endpoint}/api/v4/problems/${problemId}?access_token=${accessToken}`,
      problemData
    );

    if (response.status === 200) {
      return res.status(200).json({ status: true, data: response.data }); // Problem updated
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        res.status(401).json({ status: false, message: "Unauthorized access" }); // Unauthorized access
      } else if (error.response.status === 403) {
        res.status(403).json({ status: false, message: "Access denied" }); // Access denied
      } else if (error.response.status === 404) {
        res
          .status(404)
          .json({ status: false, message: "Problem does not exist" }); // Problem does not exist
      } else if (error.response.status === 400) {
        res.status(400).json({ status: false, error: error.response.data }); // Return the error response from the API
      }
    }
    return res.status(500).json({ status: false, error: error.error.message });
  }
};

// Delete Post -----------------------------------------------------------------------------------
export const DeleteProblem = async (req, res) => {
  try {
    let { problemId } = req.body;

    // problemId validation-------------------------------------------------------------------
    if (!isValid(problemId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Qustion ID" });
    }
    axios
      .delete(`https://${endpoint}/api/v4/problems/${problemId}?access_token=${accessToken}`)
      .then(response => {
        if (response.status === 200) {
          res.sendStatus(200); // Problem deleted
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            res.status(401).json({status:false, message:"Unauthorized access"}); // Unauthorized access
          } else if (error.response.status === 403) {
            res.status(403).json({status:false, message:"Access denied"}); // Access denied
          } else if (error.response.status === 404) {
            res.status(404).json({status:false, message:"Problem not found"}); // Problem not found
          }
        } else {
          console.log('Connection problem');
          res.status(500).json({status:false, error:"Internal Server Error"}); // Internal Server Error
        }
      });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};
