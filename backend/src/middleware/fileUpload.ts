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
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
};

const ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg', 'pdf', 'doc', 'vnd.openxmlformats-officedocument.wordprocessingml.document', 'mp3', 'mp4'];


const fileUpload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/files');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    let ext: string | undefined;
    if (file) {
      ext = file.originalname.split('.').pop();
    }
    if (ALLOWED_EXTENSIONS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
});


export default fileUpload;