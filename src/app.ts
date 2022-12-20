import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { env } from './config/config';
import router from './routes';
import cors from 'cors';

const app = express();

//options for cors midddleware
const options: cors.CorsOptions = {
   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE'
};

//db
mongoose.set('strictQuery', false);
mongoose
   .connect(env.DATABASE, {})
   .then(() => console.log('DB CONNECTED'))
   .catch((err) => console.log('DB CONNECTION ERROR', err));

// middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));

//load routes
app.use('/api/v1', router);

export default app;
