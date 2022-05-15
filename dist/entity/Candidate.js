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
exports.Candidate = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Candidate = /** @class */ (function () {
    function Candidate() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Candidate.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function (type) { return User_1.Users; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
        __metadata("design:type", User_1.Users)
    ], Candidate.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Candidate.prototype, "professional_title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Candidate.prototype, "bio", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Candidate.prototype, "age", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Candidate.prototype, "current_salary", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Candidate.prototype, "expected_salary", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Candidate.prototype, "experience", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Candidate.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Candidate.prototype, "postcode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Candidate.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Candidate.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Candidate.prototype, "headline", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Candidate.prototype, "skills", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Candidate.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Candidate.prototype, "updated_at", void 0);
    Candidate = __decorate([
        (0, typeorm_1.Entity)({ name: "candidate" })
    ], Candidate);
    return Candidate;
}());
exports.Candidate = Candidate;
//# sourceMappingURL=Candidate.js.map