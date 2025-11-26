"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const test_1 = __importDefault(require("./routes/test"));
const transactions_routes_1 = __importDefault(require("./routes/transactions.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// register routes
app.use("/test-db", test_1.default);
app.use("/transactions", transactions_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.get("/", (req, res) => {
    res.send("Backend server is running");
});
exports.default = app;
