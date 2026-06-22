import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb } from './src/config/db.js';
import { indexRouter } from './src/routes/index.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

const PORT = process.env.PORT;
app.use('/api', indexRouter);
const initSv = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

initSv();
