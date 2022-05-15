"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs1652611432180 = void 0;
var logs1652611432180 = /** @class */ (function () {
    function logs1652611432180() {
        this.name = 'logs1652611432180';
    }
    logs1652611432180.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"candidate\" (\"id\" SERIAL NOT NULL, \"professional_title\" text, \"bio\" text, \"age\" text, \"current_salary\" text NOT NULL, \"expected_salary\" text NOT NULL, \"experience\" text, \"address\" text NOT NULL, \"postcode\" text NOT NULL, \"city\" text NOT NULL, \"country\" text NOT NULL, \"headline\" text, \"skills\" text, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"user_id\" integer, CONSTRAINT \"REL_77af458165fe750934e8425031\" UNIQUE (\"user_id\"), CONSTRAINT \"PK_b0ddec158a9a60fbc785281581b\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"education\" (\"id\" SERIAL NOT NULL, \"school_name\" text NOT NULL, \"school_location\" text NOT NULL, \"degree\" text NOT NULL, \"field_of_study\" text, \"description\" text, \"marks\" text, \"start_date\" text NOT NULL, \"end_date\" text NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"user_id\" integer, CONSTRAINT \"REL_5bfcef10ecdda36d2ee68aa204\" UNIQUE (\"user_id\"), CONSTRAINT \"PK_bf3d38701b3030a8ad634d43bd6\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"experience\" (\"id\" SERIAL NOT NULL, \"company_name\" text NOT NULL, \"company_location\" text NOT NULL, \"designation\" text NOT NULL, \"description\" text, \"start_date\" text NOT NULL, \"end_date\" text NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"user_id\" integer, CONSTRAINT \"REL_62c0623650986849f3fc1d148e\" UNIQUE (\"user_id\"), CONSTRAINT \"PK_5e8d5a534100e1b17ee2efa429a\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"users\" ALTER COLUMN \"middle_name\" DROP NOT NULL")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"users\" ALTER COLUMN \"last_name\" DROP NOT NULL")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"candidate\" ADD CONSTRAINT \"FK_77af458165fe750934e8425031b\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"education\" ADD CONSTRAINT \"FK_5bfcef10ecdda36d2ee68aa2049\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"experience\" ADD CONSTRAINT \"FK_62c0623650986849f3fc1d148e7\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    logs1652611432180.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"experience\" DROP CONSTRAINT \"FK_62c0623650986849f3fc1d148e7\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"education\" DROP CONSTRAINT \"FK_5bfcef10ecdda36d2ee68aa2049\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"candidate\" DROP CONSTRAINT \"FK_77af458165fe750934e8425031b\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"users\" ALTER COLUMN \"last_name\" SET NOT NULL")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"users\" ALTER COLUMN \"middle_name\" SET NOT NULL")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"experience\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"education\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"candidate\"")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return logs1652611432180;
}());
exports.logs1652611432180 = logs1652611432180;
//# sourceMappingURL=1652611432180-logs.js.map