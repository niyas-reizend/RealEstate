"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = exports.handleRefreshToken = exports.handleUpdateBlockStatus = exports.handleDeleteUser = exports.handleGetAllAgent = exports.handleGetAllUsers = exports.handleLogin = exports.handleRegister = void 0;
const auth_service_1 = require("../services/auth.service");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens_1 = require("../utils/generateTokens");
// Registering User
const handleRegister = async (req, res) => {
    const { name, email, password, role } = req.body;
    const userSchema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(4).required(),
        role: joi_1.default.string().required(),
    });
    const { error } = userSchema.validate({ name, email, password, role });
    if (error) {
        return res.json({ error: "Validation Failed" });
    }
    try {
        const user = await (0, auth_service_1.registerUser)(name, email, password, role);
        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.handleRegister = handleRegister;
// Login
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const result = await (0, auth_service_1.loginUser)(email, password);
        // Destructure Tokens
        const { tokens: { refreshToken }, } = result;
        //storing the refresh token in the cookie (HttpOnly)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            // maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: result.message,
            user: result.user,
            tokens: {
                accessToken: result.tokens.accessToken,
            },
        });
    }
    catch (err) {
        if (err.message === "User not found" ||
            err.message === "Invalid password" ||
            err.message === "You are Blocked by the Admin") {
            return res.status(401).json({ error: err.message });
        }
        return res.status(500).json({ error: "Something went wrong" });
    }
};
exports.handleLogin = handleLogin;
// get all users
const handleGetAllUsers = async (req, res) => {
    try {
        const users = await (0, auth_service_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.handleGetAllUsers = handleGetAllUsers;
// get all agent
const handleGetAllAgent = async (req, res) => {
    try {
        const agents = await (0, auth_service_1.getAllAgent)();
        res.json(agents);
    }
    catch (error) {
        console.error("Error fetching agents:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.handleGetAllAgent = handleGetAllAgent;
// delete user
const handleDeleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const result = await (0, auth_service_1.deleteUserById)(userId);
        if (!result.success) {
            return res.status(404).json({ error: result.message });
        }
        res.json({ message: result.message });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.handleDeleteUser = handleDeleteUser;
// block or unblock users
const handleUpdateBlockStatus = async (req, res) => {
    try {
        const { userId, action } = req.body;
        if (!userId || !["block", "unblock"].includes(action)) {
            return res.status(400).json({ error: "Invalid user ID or action" });
        }
        const isBlocked = action === "block";
        const updatedUser = await (0, auth_service_1.updateUserBlockStatus)(userId, isBlocked);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user block status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.handleUpdateBlockStatus = handleUpdateBlockStatus;
// access token genration using Refresh token
const handleRefreshToken = async (req, res) => {
    const refreshToken = process.env.REFRESH_TOKEN_SECRET;
    const reftoken = req?.cookies.refreshToken;
    if (!reftoken) {
        return res.status(401).json({ error: "No refresh token Provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(reftoken, refreshToken);
        const newAccessToken = (0, generateTokens_1.generateAccessToken)({
            id: decoded.id,
            role: decoded.role,
        });
        res.status(200).json({ accessToken: newAccessToken });
    }
    catch (err) {
        console.log("eroor======", err);
    }
};
exports.handleRefreshToken = handleRefreshToken;
// logout
const handleLogout = (_req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
};
exports.handleLogout = handleLogout;
