import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController';

const router = Router();


router.post('/signup', createUser);
router.post('/login', loginUser);

export {
  router as userRouter
};