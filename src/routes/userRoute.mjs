import express from "express"
import { createUser, loginUser } from "../controllers/userController.js";
import { getProblem, getSubmissions, submisson } from "../controllers/probController.js";
import { authentication } from "../middleware/auth.js";

const router = express.Router();


router.post('/signup', createUser);
router.get('/login', loginUser);


// get problems --------------------------------------------------------------

router.get("/getproblem", authentication, getProblem);
router.post('/submit', authentication, submisson);
router.get("/submission/:submissionId", authentication, getSubmissions)
export default router