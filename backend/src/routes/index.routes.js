import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { userRouter } from './user.routes.js';
import { noteRouter } from './note.routes.js';

export const indexRouter = Router();
indexRouter.use(userRouter);
indexRouter.use(noteRouter);
indexRouter.use(authRouter);
