import express from "express"
import {  DeleteProblem, addProblem, addtestcase, updateProblem,  } from "../controllers/adminController.js";
import { adminAuthentication, authentication } from "../middleware/auth.js";


const router = express.Router();

router.post('/create', authentication, adminAuthentication, addProblem);
router.post('/addtestcase/:problemId', authentication, adminAuthentication, addtestcase);
router.put("/update/:problemId", authentication, adminAuthentication, updateProblem);
router.delete("/delete/:problemId", authentication, adminAuthentication, DeleteProblem);

export default router