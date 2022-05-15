"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.errorConverter = exports.errorHandler = void 0;
var logger_1 = __importDefault(require("../config/logger"));
var apiError_1 = __importDefault(require("../utils/apiError"));
var httpStatus = __importStar(require("http-status"));
var config_1 = __importDefault(require("../config/config"));
var errorConverter = function (err, req, res, next) {
    var error = err;
    if (!(error instanceof apiError_1.default)) {
        var statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        var message = error.message || httpStatus[statusCode];
        error = new apiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
// eslint-disable-next-line no-unused-vars
var errorHandler = function (err, req, res, next) {
    var statusCode = err.statusCode, message = err.message;
    if (config_1.default.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    var response = __assign({ code: statusCode, message: message }, (config_1.default.env === 'development' && { stack: err.stack }));
    if (config_1.default.env === 'development') {
        logger_1.default.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=Error.js.map