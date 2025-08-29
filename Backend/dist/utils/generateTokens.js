"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessToken = process.env.ACCESS_TOKEN_SECRET;
const refreshToken = process.env.REFRESH_TOKEN_SECRET;
// Access token 
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, accessToken, { expiresIn: '30m' });
};
exports.generateAccessToken = generateAccessToken;
// Refresh Token 
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, refreshToken, { expiresIn: '1d' });
};
exports.generateRefreshToken = generateRefreshToken;
