export const getProblem = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const { endpoint, accessToken } = process.env;
  try {
    const response = await axios.get(
      `https://${endpoint}/api/v4/problems?access_token=${accessToken}&page=${page}&limit=${limit}`
    );

    if (response.status === 200) {
      res.status(200).json(response.data); // Return the list of problems in JSON
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        res.status(401).json({ status: false, data: "" }); // Unauthorized access
      }
    } else {
      console.log("Connection problem");
      res.status(500).json({ status: false, data: "" }); // Internal Server Error
    }
  }
};
// submit-------------------------------------------------------------------------------------
export const submisson = async (req, res) => {
  

    try {
      
        const { problemId, source } = req.body;
        const userId= req.decodedToken.userId.toString();
        const submissionData = { problemId, source, sourceId: userId };
        
        if (!problemId || !source) {
        return res.status(400).json({status:false,message:"require all parameters"})
    }
    const response = await axios.post(
      `https://${endpoint}/api/v4/submissions?access_token=${accessToken}`,
      submissionData
    );

    if (response.status === 201) {
      res.json(response.data); // Return the submission data in JSON
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        res.status(401).json({ status: false, data: "Unauthorized access" }); // Unauthorized access
      } else if (error.response.status === 402) {
        res
          .status(402)
          .json({ status: false, data: "Unable to create submission" }); // Unable to create submission
      } else if (error.response.status === 400) {
        res.status(400).json({ status: false, error: error.response.data }); // Return the error response from the API
      }
    } else {
      console.log("Connection problem");
      res.status(500).json({ status: false, data: error.message }); // Internal Server Error
    }
  }
};

// get  submission data-------------------------------------------------------------------------------------
export const getSubmissions = async (req, res) => {
    try {
     
       
        const submissionId = req.decodedToken.userId.toString();
      const response = await axios.get(
        `https://${endpoint}/api/v4/submissions?ids=${submissionId}&access_token=${accessToken}`
      );
  
      if (response.status === 200) {
        res.status(200).json(response.data); // Return the list of submissions in JSON
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          res.status(401).json({status:false, data:"Unauthorized access"}); // Unauthorized access
        } else if (error.response.status === 400) {
          res.status(400).json(error.response.data); // Return the error response from the API
        }
      } else {
        console.log('Connection problem');
        res.status(500).json({status:false,error:error.message}); // Internal Server Error
      }
    }
  };
