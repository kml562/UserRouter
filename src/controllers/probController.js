import axios from "axios";

export const getProblem = async (req, res) => {
 
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit|| 1;
    console.log(page,"hl")
    const { endpoint, accessToken } = process.env;
    const response = await axios.get(
      `https://${endpoint}/api/v4/problems?access_token=${accessToken}&page=${page}&limit=${limit}`
    );

    if (response.status === 200) {
      res.status(200).json(response.data); // Return the list of problems in JSON
    }
  } catch (error) {
    console.log(error)
    if (error.response) {
      if (error.response.status === 401) {
        res.status(401).json({ status: false, data: "Unauthorized access" }); // Unauthorized access
      }
    } else {
      console.log("Connection problem");
      res.status(500).json({ status: false, data: "Internal Server Error" }); // Internal Server Error
    }
  }
};
// submit-------------------------------------------------------------------------------------
export const submisson = async (req, res) => {
  try {
    const { problemId, source ,compilerId} = req.body;

    const submissionData = { problemId, source, compilerId };
    const { endpoint, accessToken } = process.env;
    if (!problemId || !source) {
      return res
        .status(400)
        .json({ status: false, message: "require all parameters" });
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
    const { endpoint, accessToken } = process.env;
    const submissionId = req.params.submissionId;
    const response = await axios.get(
      `https://${endpoint}/api/v4/submissions?ids=${submissionId}&access_token=${accessToken}`
    );

    if (response.status === 200) {
      res.status(200).json(response.data); // Return the list of submissions in JSON
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        res.status(401).json({ status: false, data: "Unauthorized access" }); // Unauthorized access
      } else if (error.response.status === 400) {
        res.status(400).json(error.response.data); // Return the error response from the API
      }
    } else {
      console.log("Connection problem");
      res.status(500).json({ status: false, error: error.message }); // Internal Server Error
    }
  }
};
