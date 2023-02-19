import { Request, Response } from 'express';
import Message from '../models/message';
import { sendEmail } from '../utils/nodemailer';


const sendMessage = async (req: Request, res: Response) => {
  const newMessage = req.body;
  const { t } = req;
  if (req.file) {
    newMessage.filePath = req.file.path.replace(/\\/g, '/');
  }
  const message = await Message.create(newMessage);
  await sendEmail(newMessage, t);
  res.status(201).json({ message: message, msg: t('successMessage') });
};

export {
  sendMessage
};