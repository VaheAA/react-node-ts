import path from 'path';
require('dotenv').config();
require('express-async-errors');
import express, { Express, NextFunction, Request, Response } from 'express';
import { messageRouter } from './routes/messageRoutes';
import { userRouter } from './routes/userRoutes';
import errorHandlerMiddleware from './middleware/errorHandler';
import sequelize from './db/db';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nMiddleware from 'i18next-http-middleware';


i18next.use(Backend).use(i18nMiddleware.LanguageDetector).init({
  fallbackLng: 'hy',
  backend: {
    loadPath: path.join(__dirname, '../locales/{{lng}}/translation.json')
  }
});

const app: Express = express();

app.use(i18nMiddleware.handle(i18next));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads/files', express.static(path.join('uploads', 'files')));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/message', messageRouter);
app.use('/api/auth', userRouter);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();


    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
