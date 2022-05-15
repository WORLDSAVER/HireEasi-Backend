"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    //@ts-ignore
    var bearerHeader = req.headers['authorization'];
    var token = bearerHeader && bearerHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.userId = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports.default = verifyToken;
//# sourceMappingURL=VerifyToken.js.map