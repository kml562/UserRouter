import express, { urlencoded } from 'express';
import multer from 'multer';
import userRouter from '../routes/userRoute.mjs';
import adminRouoter from '../routes/adminRouther.js'
const app = express();


// global middleware --------------------------------------------------------------------------------
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(multer().any());

// local routes --------------------------------------------------------------------------------------
app.use('/user', userRouter);
app.use('/admin', adminRouoter);

export default app;
