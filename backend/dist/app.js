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
const path_1 = __importDefault(require("path"));
require('dotenv').config();
require('express-async-errors');
const express_1 = __importDefault(require("express"));
const messageRoutes_1 = require("./routes/messageRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const db_1 = __importDefault(require("./db/db"));
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
i18next_1.default.use(i18next_fs_backend_1.default).use(i18next_http_middleware_1.default.LanguageDetector).init({
    fallbackLng: 'hy',
    backend: {
        loadPath: path_1.default.join(__dirname, '../locales/{{lng}}/translation.json')
    }
});
const app = (0, express_1.default)();
app.use(i18next_http_middleware_1.default.handle(i18next_1.default));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/uploads/files', express_1.default.static(path_1.default.join('uploads', 'files')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use('/api/message', messageRoutes_1.messageRouter);
app.use('/api/auth', userRoutes_1.userRouter);
app.use(errorHandler_1.default);
const port = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate();
        yield db_1.default.sync();
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
