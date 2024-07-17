import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connection from './config/dbConfig.js';

import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
dotenv.config();
connection();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
