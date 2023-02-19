"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const fileUpload_1 = __importDefault(require("../middleware/fileUpload"));
const router = (0, express_1.Router)();
exports.messageRouter = router;
router.post('/', fileUpload_1.default.single('file'), messageController_1.sendMessage);
