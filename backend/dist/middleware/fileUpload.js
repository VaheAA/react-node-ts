"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const MIME_TYPE_MAP = {
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
const fileUpload = (0, multer_1.default)({
    limits: { fileSize: 10 * 1024 * 1024 },
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/files');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, (0, uuid_1.v4)() + '.' + ext);
            console.log(ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext;
        if (file) {
            ext = file.originalname.split('.').pop();
            if (ALLOWED_EXTENSIONS.includes(ext)) {
                cb(null, true);
            }
            else {
                cb(new Error('Invalid file type.'));
            }
        }
    }
});
exports.default = fileUpload;
