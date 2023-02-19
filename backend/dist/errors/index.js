"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const badRequestError_1 = __importDefault(require("./badRequestError"));
const unauthenticatedError_1 = __importDefault(require("./unauthenticatedError"));
const customApiError_1 = __importDefault(require("./customApiError"));
const notFoundError_1 = __importDefault(require("./notFoundError"));
module.exports = {
    BadRequestError: badRequestError_1.default,
    UnauthenticatedError: unauthenticatedError_1.default,
    NotFoundError: notFoundError_1.default,
    CustomAPIError: customApiError_1.default
};
