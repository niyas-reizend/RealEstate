"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetEmail = void 0;
const mailer_1 = require("./mailer");
const sendResetEmail = async (to, resetToken) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken.token}`;
    const mailOptions = {
        from: `"RentEase Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Password Reset Request",
        html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
    };
    await mailer_1.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error:", error);
        }
        else {
            console.log("Email sent");
        }
    });
};
exports.sendResetEmail = sendResetEmail;
