import { Router } from 'express';
import { exportMessages, getAllMessages, sendMessage } from '../controllers/messageController';
import checkAuth from '../middleware/checkAuth';
import fileUpload from '../middleware/fileUpload';

const router = Router();


router.post('/', fileUpload.single('file'), sendMessage);

router.use(checkAuth);

router.get('/', getAllMessages);
router.get('/export', exportMessages);


export {
  router as messageRouter
};