"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = __importStar(require("joi"));
var pick_1 = __importDefault(require("../utils/pick"));
var apiError_1 = __importDefault(require("../utils/apiError"));
var httpStatus = __importStar(require("http-status"));
var validate = function (schema) { return function (req, res, next) {
    var validSchema = (0, pick_1.default)(schema, ['params', 'query', 'body']);
    var object = (0, pick_1.default)(req, Object.keys(validSchema));
    var _a = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object), value = _a.value, error = _a.error;
    if (error) {
        var errorMessage = void 0;
        if (process.env.NODE_ENV === 'development') {
            console.log(error);
            errorMessage = error.details.map(function (details) { return details.message; }).join(', ');
        }
        else {
            errorMessage = "Something went wrong";
        }
        return next(new apiError_1.default(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
}; };
exports.default = validate;
//# sourceMappingURL=Validate.js.map