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
exports.Education = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Education = /** @class */ (function () {
    function Education() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Education.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function (type) { return User_1.Users; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
        __metadata("design:type", User_1.Users)
    ], Education.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Education.prototype, "school_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Education.prototype, "school_location", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Education.prototype, "degree", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Education.prototype, "field_of_study", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Education.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Education.prototype, "marks", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Education.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Education.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Education.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Education.prototype, "updated_at", void 0);
    Education = __decorate([
        (0, typeorm_1.Entity)({ name: "education" })
    ], Education);
    return Education;
}());
exports.Education = Education;
//# sourceMappingURL=Education.js.map