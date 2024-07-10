import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import connection from './config/dbConfig.js';

import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(
  express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000})
);
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
  connection();
});
