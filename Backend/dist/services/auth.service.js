"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBlockStatus = exports.deleteUserById = exports.getAllAgent = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const datasource_1 = __importDefault(require("../database/datasource"));
const User_1 = require("../entities/User");
const hash_1 = require("../utils/hash");
const userRepo = datasource_1.default.getRepository(User_1.User);
// Register User 
const registerUser = async (name, email, password, role) => {
    const existing = await userRepo.findOneBy({ email });
    if (existing) {
        throw new Error("User with this email already exists.");
    }
    const hashed = await (0, hash_1.hashPassword)(password);
    const newUser = userRepo.create({
        name,
        email,
        password: hashed,
        role,
    });
    return await userRepo.save(newUser);
};
exports.registerUser = registerUser;
const generateTokens_1 = require("../utils/generateTokens");
const loginUser = async (email, password) => {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.isBlocked) {
        throw new Error("You are Blocked by the Admin");
    }
    const isPasswordValid = await (0, hash_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const payload = { id: user.id, role: user.role };
    const accessToken = (0, generateTokens_1.generateAccessToken)(payload);
    const refreshToken = (0, generateTokens_1.generateRefreshToken)(payload);
    return {
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        tokens: {
            accessToken,
            refreshToken
        },
    };
};
exports.loginUser = loginUser;
// get all users 
const getAllUsers = async () => {
    const userRepo = datasource_1.default.getRepository(User_1.User);
    const users = await userRepo.find({
        relations: [
            "properties",
            "handledProperties",
            "tenantProfile",
            "enquiries",
            "tenantAgreement",
            "ownerAgreements",
            "commissions",
            "resetTokens"
        ],
        order: {
            createdAt: "DESC"
        }
    });
    return users;
};
exports.getAllUsers = getAllUsers;
// get all agent 
const getAllAgent = async () => {
    const userRepo = datasource_1.default.getRepository(User_1.User);
    const agents = await userRepo.find({
        where: { role: 'agent' },
        select: ['id', 'name', 'email', 'role', 'isBlocked'], // select only necessary fields
        order: { createdAt: "DESC" }
    });
    return agents;
};
exports.getAllAgent = getAllAgent;
// delete user 
const deleteUserById = async (id) => {
    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
        return { success: false, message: "user not found" }; // Not found
    }
    await userRepo.remove(user); // or: await userRepo.delete(id)
    return { success: true, message: "user deletion successfull" };
};
exports.deleteUserById = deleteUserById;
// block or unblock user 
const updateUserBlockStatus = async (id, isBlocked) => {
    const userRepo = datasource_1.default.getRepository(User_1.User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user)
        return null;
    user.isBlocked = isBlocked;
    return await userRepo.save(user);
};
exports.updateUserBlockStatus = updateUserBlockStatus;
