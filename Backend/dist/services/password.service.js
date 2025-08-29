"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResetPassword = exports.handleForgotPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ResetToken_1 = require("../entities/ResetToken");
const datasource_1 = __importDefault(require("../database/datasource"));
const User_1 = require("../entities/User");
const sendResetEmail_1 = require("../utils/sendResetEmail");
const hash_1 = require("../utils/hash");
const userRepo = datasource_1.default.getRepository(User_1.User);
const resetTokenRepo = datasource_1.default.getRepository(ResetToken_1.ResetToken);
const handleForgotPassword = async (email) => {
    const user = await userRepo.findOneBy({ email });
    if (!user)
        throw new Error("User not found");
    // Clear old tokens
    await resetTokenRepo.delete({ user: { id: user.id } });
    const token = crypto_1.default.randomBytes(4).toString("hex");
    console.log(token);
    const expiresAt = new Date(Date.now() + 2000 * 60 * 60); // 2 hour
    const resetToken = resetTokenRepo.create({ user, token, expiresAt });
    await resetTokenRepo.save(resetToken);
    console.log(resetToken);
    //   const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await (0, sendResetEmail_1.sendResetEmail)(email, resetToken);
};
exports.handleForgotPassword = handleForgotPassword;
const handleResetPassword = async (token, newPassword) => {
    const resetToken = await resetTokenRepo.findOne({
        where: { token: token },
        relations: ["user"],
    });
    if (!resetToken || resetToken.expiresAt < new Date()) {
        throw new Error("Invalid or expired token");
    }
    const hashedpassword = await (0, hash_1.hashPassword)(newPassword);
    resetToken.user.password = hashedpassword; // You can hash it here
    await userRepo.save(resetToken.user);
    await resetTokenRepo.delete({ id: resetToken.id }); // delete token after use
};
exports.handleResetPassword = handleResetPassword;
