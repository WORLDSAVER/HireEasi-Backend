"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = exports.RegisterValidation = void 0;
var joi_1 = __importDefault(require("joi"));
var RegisterValidation = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        first_name: joi_1.default.string().required(),
        middle_name: joi_1.default.string().allow('', null),
        last_name: joi_1.default.string().allow('', null),
        phone: joi_1.default.string().max(13).min(10).required(),
        image_url: joi_1.default.string().allow('', null),
    })
};
exports.RegisterValidation = RegisterValidation;
var LoginValidation = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    })
};
exports.LoginValidation = LoginValidation;
//# sourceMappingURL=auth.validations.js.map