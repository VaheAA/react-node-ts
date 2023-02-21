"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Message = db_1.default.define('message', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING, validate: { isEmail: true, notEmpty: true } },
    phone: { type: sequelize_1.DataTypes.STRING },
    category: { type: sequelize_1.DataTypes.STRING },
    status: { type: sequelize_1.DataTypes.STRING },
    period: { type: sequelize_1.DataTypes.STRING },
    date: { type: sequelize_1.DataTypes.STRING },
    witness: { type: sequelize_1.DataTypes.STRING },
    message: { type: sequelize_1.DataTypes.TEXT },
    filePath: { type: sequelize_1.DataTypes.STRING },
});
exports.default = Message;
