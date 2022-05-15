"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var path_1 = __importDefault(require("path"));
var config_1 = __importDefault(require("./config"));
var enumerateErrorFormat = winston_1.default.format(function (info) {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
var logger = winston_1.default.createLogger({
    level: config_1.default.env === 'development' ? 'debug' : 'info',
    format: winston_1.default.format.combine(winston_1.default.format.label({ label: path_1.default.basename(process.mainModule.filename) }), winston_1.default.format.timestamp({
        format: 'HH:mm:ss'
    }), enumerateErrorFormat(), config_1.default.env === 'development' ? winston_1.default.format.colorize() : winston_1.default.format.uncolorize(), winston_1.default.format.splat(), winston_1.default.format.json(), winston_1.default.format.printf(function (info) { return "".concat(info.timestamp, " [").concat(info.label, "] ").concat(info.level, ": ").concat(info.message); })),
    transports: [
        new winston_1.default.transports.Console({
            stderrLevels: ['error'],
        }),
        new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'logs/combined.log' }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map