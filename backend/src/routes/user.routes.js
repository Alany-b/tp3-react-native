import { Router } from 'express';
import { getUsers } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const userRouter = Router();
userRouter.get('/auth/users', authMiddleware, getUsers);
