import { Router } from 'express';
import {
  getProfileUser,
  loginUser,
  logOutUser,
  registerUser,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const authRouter = Router();
authRouter.post('/auth/register', registerUser);
authRouter.post('/auth/login', loginUser);
authRouter.post('/auth/logout', authMiddleware, logOutUser);
authRouter.get('/auth/profile', authMiddleware, getProfileUser);
