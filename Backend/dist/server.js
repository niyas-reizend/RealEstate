"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connectDB_1 = require("./database/connectDB");
const PORT = 5100;
const startServer = async () => {
    try {
        await (0, connectDB_1.connectDB)();
        app_1.default.get("/", async (req, res) => {
            res.json({ msg: "hello" });
        });
        app_1.default.listen(PORT, () => {
            console.log(`Server is running in http://localhost:${PORT} `);
        });
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1); // Exit process with failure
    }
};
if (process.env.STATUS !== "production") {
    startServer();
}
exports.default = app_1.default;
