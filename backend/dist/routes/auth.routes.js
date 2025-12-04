"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_controllers_2 = require("../controllers/auth.controllers");
const router = express_1.default.Router();
router.post("/login", auth_controllers_1.loginUser);
router.post("/register", auth_controllers_2.registerUserController);
exports.default = router;
