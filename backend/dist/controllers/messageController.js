"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.exportMessages = exports.getAllMessages = exports.sendMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const nodemailer_1 = require("../utils/nodemailer");
const csv = __importStar(require("fast-csv"));
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
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_1.default.findAll();
    res.status(200).json({ messages });
});
exports.getAllMessages = getAllMessages;
const exportMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_1.default.findAll();
    const csvStream = csv.format({ headers: true });
    csvStream.write(['id', 'name', 'email', 'phone', 'category', 'status', 'witness', 'message', 'filepath', 'createdAt']);
    messages.forEach((message) => {
        csvStream.write([message.id, message.name, message.phone, message.category, message.status, message.witness, message.message, message.filepath, message.createdAt]);
    });
    csvStream.end();
    // Set the content type and attachment header
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=messages.csv');
    // Send the CSV data as response
    console.log(res);
    csvStream.pipe(res);
});
exports.exportMessages = exportMessages;
