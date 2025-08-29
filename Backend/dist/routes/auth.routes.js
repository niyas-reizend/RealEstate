"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authorizeRole_1 = require("../middleware/authorizeRole");
const authenticate_1 = require("../middleware/authenticate");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", auth_controller_1.handleRegister);
authRouter.post("/login", auth_controller_1.handleLogin);
authRouter.post("/logout", auth_controller_1.handleLogout);
authRouter.post("/refresh", auth_controller_1.handleRefreshToken);
authRouter.get("/getallusers", authenticate_1.authenticate, (0, authorizeRole_1.authorizeRoles)("admin"), auth_controller_1.handleGetAllUsers); //to get all the users
authRouter.delete("/users/:id", authenticate_1.authenticate, (0, authorizeRole_1.authorizeRoles)("admin"), auth_controller_1.handleDeleteUser); //to delete the users
authRouter.patch("/users/block-status", authenticate_1.authenticate, (0, authorizeRole_1.authorizeRoles)("admin"), auth_controller_1.handleUpdateBlockStatus); //to block the users
authRouter.get("/getAllAgents", auth_controller_1.handleGetAllAgent);
exports.default = authRouter;
