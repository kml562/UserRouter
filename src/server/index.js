import * as dotenv from 'dotenv';
import { startServer } from '../db/mongoose.js';
import app from './app.js';
dotenv.config();
const {PORT,MONGOURI}=process.env
startServer(PORT,MONGOURI,app);
