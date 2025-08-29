"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMiddleware = void 0;
const datasource_1 = __importDefault(require("../database/datasource"));
const User_1 = require("../entities/User");
const BlockMiddleware = async (req, res, next) => {
    try {
        const userRepo = datasource_1.default.getRepository(User_1.User);
        const user = await userRepo.findOneBy({ id: req.user.id });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        if (user.isBlocked) {
            return res.status(403).json({ error: "Your account is blocked.Please contact Support" });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({ error: "Server error while checking Block status" });
    }
};
exports.BlockMiddleware = BlockMiddleware;
