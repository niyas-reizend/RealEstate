"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const datasource_1 = __importDefault(require("./datasource"));
const connectDB = async () => {
    try {
        await datasource_1.default.initialize();
        console.log("Connected to DataBase.");
    }
    catch (error) {
        console.log("Connection to DB failed...", error);
    }
};
exports.connectDB = connectDB;
