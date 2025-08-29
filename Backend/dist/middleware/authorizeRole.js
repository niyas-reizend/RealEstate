"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "No user info" });
        }
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden: You are not allowed to perfrom this operation" });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
