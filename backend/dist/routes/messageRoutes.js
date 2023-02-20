"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
const fileUpload_1 = __importDefault(require("../middleware/fileUpload"));
const router = (0, express_1.Router)();
exports.messageRouter = router;
router.post('/', fileUpload_1.default.single('file'), messageController_1.sendMessage);
router.use(checkAuth_1.default);
router.get('/', messageController_1.getAllMessages);
router.get('/export', messageController_1.exportMessages);
