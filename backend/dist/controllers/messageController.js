"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const nodemailer_1 = require("../utils/nodemailer");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = req.body;
    const { t } = req;
    if (req.file) {
        newMessage.filePath = req.file.path.replace(/\\/g, '/');
    }
    const message = yield message_1.default.create(newMessage);
    yield (0, nodemailer_1.sendEmail)(newMessage, t);
    res.status(201).json({ message: message, msg: t('successMessage') });
});
exports.sendMessage = sendMessage;
