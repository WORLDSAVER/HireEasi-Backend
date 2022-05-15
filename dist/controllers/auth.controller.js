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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.getAccessToken = exports.Me = exports.Logout = exports.Login = void 0;
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var http_status_1 = __importDefault(require("http-status"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = require("../services/auth");
var strings_1 = require("../types/strings");
var apiError_1 = __importDefault(require("../utils/apiError"));
var apiResponse_1 = __importDefault(require("../utils/apiResponse"));
var Register = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                return [4 /*yield*/, (0, auth_1.register)(body)];
            case 1:
                response = _a.sent();
                if (response.status) {
                    return [2 /*return*/, res.status(http_status_1.default.CREATED).send(new apiResponse_1.default(http_status_1.default.OK, {}, response.message))];
                }
                return [2 /*return*/, res.status(http_status_1.default.BAD_REQUEST).send(new apiResponse_1.default(http_status_1.default.BAD_REQUEST, {}, response.message))];
        }
    });
}); });
exports.Register = Register;
var Login = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userLogin, _b, id, name, phone, image_url, access_level;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                console.log(req.cookies);
                return [4 /*yield*/, (0, auth_1.login)(email, password)];
            case 1:
                userLogin = _c.sent();
                if (userLogin.status === strings_1.ERROR) {
                    throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, userLogin.message);
                }
                res.cookie('jwt', userLogin.data.refresh_token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 1000 * 30,
                    secure: true,
                    sameSite: 'none'
                });
                _b = userLogin.data.user, id = _b.id, name = _b.name, phone = _b.phone, image_url = _b.image_url, access_level = _b.access_level;
                return [2 /*return*/, res.json({ token: userLogin.data.token, user: { id: id, name: name, phone: phone, image_url: image_url, email: email, access_level: access_level } })];
        }
    });
}); });
exports.Login = Login;
var Logout = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie('jwt');
        return [2 /*return*/, res.status(http_status_1.default.OK).json({
                status: http_status_1.default.OK,
                message: 'Logout successful'
            })];
    });
}); });
exports.Logout = Logout;
var Me = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                return [4 /*yield*/, (0, auth_1.me)(userId.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
                }
                return [2 /*return*/, res.status(http_status_1.default.OK).json(__assign({}, user[0]))];
        }
    });
}); });
exports.Me = Me;
var getAccessToken = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, id, user, _a, user_name, user_phone, user_image_url, user_access_level, user_email, access_token;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.jwt;
                console.log(req.cookies);
                if (!refreshToken) {
                    throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Refresh token not found');
                }
                id = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET, function (err, decoded) {
                    if (err) {
                        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Refresh token is invalid');
                    }
                    return decoded;
                }).id;
                return [4 /*yield*/, (0, auth_1.me)(id)];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
                }
                _a = user[0], user_name = _a.user_name, user_phone = _a.user_phone, user_image_url = _a.user_image_url, user_access_level = _a.user_access_level, user_email = _a.user_email;
                access_token = jsonwebtoken_1.default.sign({
                    id: id,
                    access_level: user_access_level
                }, process.env.JWT_ACCESS_SECRET, { expiresIn: "".concat(process.env.JWT_ACCESS_EXPIRATION_MINUTES, "m") });
                return [2 /*return*/, res.status(http_status_1.default.OK).json({
                        access_token: access_token,
                        roles: ['viewer'],
                        user: {
                            id: id,
                            name: user_name,
                            phone: user_phone,
                            image_url: user_image_url,
                            email: user_email,
                            access_level: user_access_level
                        }
                    })];
        }
    });
}); });
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=auth.controller.js.map