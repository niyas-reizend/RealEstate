"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_controller_1 = require("../controllers/password.controller");
const express_1 = __importDefault(require("express"));
const passwordRouter = express_1.default.Router();
passwordRouter.post("/forgot-password", password_controller_1.forgotPasswordController);
passwordRouter.post("/reset-password/:token", password_controller_1.resetPasswordController);
exports.default = passwordRouter;
