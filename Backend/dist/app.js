"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const property_route_1 = __importDefault(require("./routes/property.route"));
const agreement_routes_1 = __importDefault(require("./routes/agreement.routes"));
const enquiry_routes_1 = __importDefault(require("./routes/enquiry.routes"));
const commission_routes_1 = __importDefault(require("./routes/commission.routes"));
const password_routes_1 = __importDefault(require("./routes/password.routes"));
const path_1 = __importDefault(require("path"));
const tenantProfile_routes_1 = __importDefault(require("./routes/tenantProfile.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
// import dashboardRoutes from "./routes/dashboard.routes";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:4000", // Your Vite frontend port
    credentials: true, // if sending cookies/auth headers
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "./uploads")));
app.use("/auth", auth_routes_1.default);
app.use("/api", property_route_1.default);
app.use("/api", agreement_routes_1.default);
app.use("/api", enquiry_routes_1.default);
app.use("/api", commission_routes_1.default);
app.use("/api", password_routes_1.default);
app.use("/api", tenantProfile_routes_1.default);
app.use("/api", booking_routes_1.default);
console.log("git test");
// app.use("/api",dashboardRoutes);
exports.default = app;
