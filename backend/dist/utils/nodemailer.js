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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(messageBody, t) {
    return __awaiter(this, void 0, void 0, function* () {
        let testAccount = yield nodemailer_1.default.createTestAccount();
        const transporter = nodemailer_1.default.createTransport({
            host: 'mail.simple-qr.me',
            port: 465,
            auth: {
                user: 'speakup@simple-qr.me',
                pass: '#KanekiKen42'
            }
        });
        let messageHtml = `
  <p><strong>${t('emailTemaplateFields.name')}</strong> ${messageBody.name}
  <p><strong>${t('emailTemaplateFields.email')}</strong>  ${messageBody.email}
  <p><strong>${t('emailTemaplateFields.phone')}</strong> ${messageBody.phone}
  <p><strong>${t('emailTemaplateFields.category')}</strong> ${messageBody.category}
  <p><strong>${t('emailTemaplateFields.status')}</strong> ${messageBody.status}
  <p><strong>${t('emailTemaplateFields.period')}</strong> ${messageBody.date}
  <p><strong>${t('emailTemaplateFields.date')}</strong> ${messageBody.period}
  <p><strong>${t('emailTemaplateFields.witness')}</strong>  ${messageBody.witness}
  <p><strong>${t('emailTemaplateFields.message')}</strong> ${messageBody.message}
  `;
        let autoreplyHtml = `
  <p> ${t('autoreplyText.p1')}</p> 
  <p>${t('autoreplyText.p2')} </p> 
  <p> ${t('autoreplyText.p3')}</p>
  <p> <strong> ${t('autoreplyText.p4')}<br>
      </strong>${t('autoreplyText.p5')}</p> 
  `;
        let info = yield transporter.sendMail({
            from: `${messageBody.name} <${messageBody.email}>`,
            to: 'speakup@simple-qr.me',
            subject: 'Speak-Up',
            html: messageHtml,
            attachments: [
                {
                    filename: messageBody === null || messageBody === void 0 ? void 0 : messageBody.file,
                    path: messageBody.filePath
                },
            ]
        });
        if (info.accepted) {
            yield transporter.sendMail({
                from: 'Speakup <noreply@simple-qr.me>',
                to: `${messageBody.email}`,
                subject: t('autoreplyText.subject'),
                html: autoreplyHtml
            });
        }
    });
}
exports.sendEmail = sendEmail;
