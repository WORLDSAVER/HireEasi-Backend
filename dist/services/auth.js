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
exports.me = exports.register = exports.login = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = require("../entity/User");
var bcrypt = __importStar(require("bcryptjs"));
var typeorm_1 = require("typeorm");
var strings_1 = require("../types/strings");
function login(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, isPasswordValid, access_token, refresh_token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.Users).findOne({ where: { email: email } })];
                case 1:
                    user = _a.sent();
                    //If user not found
                    if (!user) {
                        return [2 /*return*/, {
                                status: strings_1.ERROR,
                                message: 'User not found'
                            }];
                    }
                    //If user is not active
                    if (!user.is_active) {
                        return [2 /*return*/, {
                                status: strings_1.ERROR,
                                message: 'User is not active'
                            }];
                    }
                    return [4 /*yield*/, bcrypt.compare(password, user.password_hash)];
                case 2:
                    isPasswordValid = _a.sent();
                    //If password is not valid
                    if (!isPasswordValid) {
                        return [2 /*return*/, {
                                status: strings_1.ERROR,
                                message: 'Invalid password'
                            }];
                    }
                    access_token = jsonwebtoken_1.default.sign({
                        id: user.id,
                        access_level: user.access_level
                    }, process.env.JWT_ACCESS_SECRET, { expiresIn: "".concat(process.env.JWT_ACCESS_EXPIRATION_MINUTES, "m") });
                    refresh_token = jsonwebtoken_1.default.sign({
                        id: user.id,
                        access_level: user.access_level
                    }, process.env.JWT_REFRESH_SECRET, { expiresIn: "".concat(process.env.JWT_REFRESH_EXPIRATION_DAYS, "d") });
                    //Save the refresh token in the database
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.Users).update(user.id, { refresh_token: refresh_token })];
                case 3:
                    //Save the refresh token in the database
                    _a.sent();
                    return [2 /*return*/, {
                            status: strings_1.SUCCESS,
                            data: {
                                token: access_token,
                                refresh_token: refresh_token,
                                user: user
                            }
                        }];
                case 4:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, {
                            status: strings_1.ERROR,
                            message: err_1.message
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function register(body) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, first_name, middle_name, last_name, phone, access_level, image_url, hashedPassword, avatar, userExists, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = body.email, password = body.password, first_name = body.first_name, middle_name = body.middle_name, last_name = body.last_name, phone = body.phone, access_level = body.access_level, image_url = body.image_url;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _a.sent();
                    avatar = "https://avatars.dicebear.com/api/male/".concat(hashedPassword, ".svg");
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.Users).findOne({
                            where: {
                                email: email
                            }
                        })];
                case 3:
                    userExists = _a.sent();
                    if (!userExists) return [3 /*break*/, 4];
                    throw new Error('User already exists');
                case 4: return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.Users)
                        .createQueryBuilder("user")
                        .insert()
                        .values({
                        email: email,
                        password_hash: hashedPassword,
                        first_name: first_name,
                        middle_name: middle_name,
                        last_name: last_name,
                        phone: phone,
                        access_level: access_level,
                        created_at: new Date(),
                        image_url: image_url || avatar
                    })
                        .execute()];
                case 5:
                    user = _a.sent();
                    if (user) {
                        return [2 /*return*/, {
                                status: true,
                                message: 'User created successfully'
                            }];
                    }
                    else {
                        throw new Error('User not created');
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, {
                            status: false,
                            message: e_1.message
                        }];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function me(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.Users)
                        .createQueryBuilder("user")
                        .where("user.id = :id", { id: id })
                        .execute()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.me = me;
//# sourceMappingURL=auth.js.map