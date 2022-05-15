"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var helmet_1 = __importDefault(require("helmet"));
var xss_clean_1 = __importDefault(require("xss-clean"));
var cors_1 = __importDefault(require("cors"));
var compression_1 = __importDefault(require("compression"));
var index_1 = __importDefault(require("./routes/index"));
var apiError_1 = __importDefault(require("./utils/apiError"));
var http_status_1 = __importDefault(require("http-status"));
var Error_1 = require("./middlewares/Error");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_sanitizer_1 = __importDefault(require("express-sanitizer"));
//Middlewares
var app = (0, express_1.default)();
exports.app = app;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, xss_clean_1.default)());
app.use((0, express_sanitizer_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3333', '*'],
    credentials: true
}));
app.options('*', (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config({ path: '.env' });
//Router
app.use('/api/v1', index_1.default);
//404
app.use(function (req, res, next) {
    next(new apiError_1.default(http_status_1.default.NOT_FOUND, 'Not Found'));
});
// convert error to ApiError, if needed
app.use(Error_1.errorConverter);
// handle error
app.use(Error_1.errorHandler);
//# sourceMappingURL=server.js.map