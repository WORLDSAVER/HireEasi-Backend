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
var dotenv_1 = __importDefault(require("dotenv"));
var joi_1 = __importDefault(require("joi"));
var path = __importStar(require("path"));
dotenv_1.default.config({ path: path.join(__dirname, '../../.env') });
var envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid('production', 'development', 'test').required(),
    PORT: joi_1.default.number().default(5000),
    JWT_ACCESS_SECRET: joi_1.default.string().required().description('JWT secret key'),
    JWT_REFRESH_SECRET: joi_1.default.string().required().description('JWT refresh secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number().default(1).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description('minutes after which verify email token expires'),
    SMTP_HOST: joi_1.default.string().description('server that will send the emails'),
    SMTP_PORT: joi_1.default.number().description('port to connect to the email server'),
    SMTP_USERNAME: joi_1.default.string().description('username for email server'),
    SMTP_PASSWORD: joi_1.default.string().description('password for email server'),
    EMAIL_FROM: joi_1.default.string().description('the from field in the emails sent by the app'),
})
    .unknown();
var _a = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env), envVars = _a.value, error = _a.error;
if (error) {
    throw new Error("Config validation error: ".concat(error.message));
}
var schema = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_ACCESS_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
};
exports.default = schema;
//# sourceMappingURL=config.js.map