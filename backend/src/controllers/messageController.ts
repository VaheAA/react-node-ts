import e, { Request, Response } from 'express';
import Message from '../models/message';
import { sendEmail } from '../utils/nodemailer';
import * as csv from 'fast-csv';


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

const getAllMessages = async (req: Request, res: Response) => {

  let { limit, page } = (req.query) as any;

  page = page || 1;
  limit = limit || 9;

  let offset = page * limit - limit;


  const messages = await Message.findAndCountAll({ limit: parseInt(limit), offset: offset, attributes: { exclude: ['updatedAt'] } });


  res.status(200).json({ messages });
};

const exportMessages = async (req: Request, res: Response) => {
  const messages = await Message.findAll();

  const csvStream = csv.format({ headers: true });

  csvStream.write(['id', 'name', 'email', 'phone', 'category', 'status', 'witness', 'message', 'createdAt']);

  messages.forEach((message: any) => {
    csvStream.write([message.id, message.name, message.email, message.phone, message.category, message.status, message.witness, message.message, message.createdAt]);
  });

  csvStream.end();

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=messages.csv');

  csvStream.pipe(res);
};

export {
  sendMessage,
  getAllMessages,
  exportMessages
};