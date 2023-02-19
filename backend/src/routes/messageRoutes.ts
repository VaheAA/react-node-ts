import { Express, Request, Response } from 'express';
import { Router } from 'express';
import { sendMessage } from '../controllers/messageController';
import fileUpload from '../middleware/fileUpload';

const router = Router();


router.post('/', fileUpload.single('file'), sendMessage);


export {
  router as messageRouter
};