"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = void 0;
const password_service_1 = require("../services/password.service");
const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        await (0, password_service_1.handleForgotPassword)(email);
        res.status(200).json({ message: "Reset link sent to email." });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.forgotPasswordController = forgotPasswordController;
const resetPasswordController = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        await (0, password_service_1.handleResetPassword)(token, newPassword);
        res.status(200).json({ message: "Password updated successfully." });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.resetPasswordController = resetPasswordController;
