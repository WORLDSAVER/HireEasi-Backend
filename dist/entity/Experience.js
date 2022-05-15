"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Experience = /** @class */ (function () {
    function Experience() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Experience.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function (type) { return User_1.Users; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
        __metadata("design:type", User_1.Users)
    ], Experience.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Experience.prototype, "company_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Experience.prototype, "company_location", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Experience.prototype, "designation", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Experience.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Experience.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Experience.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Experience.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Experience.prototype, "updated_at", void 0);
    Experience = __decorate([
        (0, typeorm_1.Entity)({ name: "experience" })
    ], Experience);
    return Experience;
}());
exports.Experience = Experience;
//# sourceMappingURL=Experience.js.map