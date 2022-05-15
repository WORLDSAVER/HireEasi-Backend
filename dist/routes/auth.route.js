"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Validate_1 = __importDefault(require("../middlewares/Validate"));
var auth_validations_1 = require("../validations/auth.validations");
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.default.Router();
router
    .route('/register')
    .post((0, Validate_1.default)(auth_validations_1.RegisterValidation), auth_controller_1.Register);
router
    .route('/login')
    .post((0, Validate_1.default)(auth_validations_1.LoginValidation), auth_controller_1.Login);
router.route('/refresh').get(auth_controller_1.getAccessToken);
router.route('/logout').get(auth_controller_1.Logout);
exports.default = router;
//# sourceMappingURL=auth.route.js.map