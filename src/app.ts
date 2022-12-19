import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { env } from './config/config';
import router from './routes';

const app = express();

//db
mongoose.set('strictQuery', false);
mongoose
   .connect(env.DATABASE, {})
   .then(() => console.log('DB CONNECTED'))
   .catch((err) => console.log('DB CONNECTION ERROR', err));

//load routes
app.use('/api/v1', router);

export default app;
