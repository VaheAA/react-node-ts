import multer from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface File extends Express.Multer.File {
  mimetype: string;
}

type CallbackError = ((error: Error) => void);
type CallbackSuccess = ((error: null, success: boolean) => void);
type Callback = CallbackError | CallbackSuccess;

interface DiskStorage {
  destination: (req: Request, file: File, cb: Callback) => void;
  filename: (req: Request, file: File, cb: Callback) => void;
}

interface MulterConfig {
  limits: number;
  storage: DiskStorage;
  fileFilter: (req: Request, file: File, cb: Callback) => void;
}

const MIME_TYPE_MAP: { [key: string]: string; } = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'audio/mpeg': 'mp3',
  'video/mp4': 'mp4',
};


const ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg', 'pdf', 'doc', 'docx', 'mp3', 'mp4'];
const ALLOWED_MIME_TYPES = [];

const fileUpload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/files');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + ext);
      console.log(ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    let ext: string;
    if (file) {
      ext = file.originalname.split('.').pop() as string;

      if (ALLOWED_EXTENSIONS.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
      }
    }
  }
});


export default fileUpload;