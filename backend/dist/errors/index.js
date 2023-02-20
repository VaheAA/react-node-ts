"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = exports.NotFoundError = exports.UnauthenticatedError = exports.BadRequestError = void 0;
const badRequestError_1 = __importDefault(require("./badRequestError"));
exports.BadRequestError = badRequestError_1.default;
const unauthenticatedError_1 = __importDefault(require("./unauthenticatedError"));
exports.UnauthenticatedError = unauthenticatedError_1.default;
const customApiError_1 = __importDefault(require("./customApiError"));
exports.CustomAPIError = customApiError_1.default;
const notFoundError_1 = __importDefault(require("./notFoundError"));
exports.NotFoundError = notFoundError_1.default;
