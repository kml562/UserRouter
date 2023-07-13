import express from "express"
import { createUser, loginUser } from "../controllers/userController.js";
const router = express.Router();


router.post('/signup', createUser);
router.get('/login', loginUser);
export default router