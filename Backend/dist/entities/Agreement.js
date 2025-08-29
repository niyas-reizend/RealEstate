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
exports.Agreement = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Property_1 = require("./Property");
let Agreement = class Agreement {
};
exports.Agreement = Agreement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Agreement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Agreement.prototype, "rentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Agreement.prototype, "fixedDeposit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Agreement.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Agreement.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Agreement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, user => user.tenantAgreement, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Agreement.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.ownerAgreements, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_1.User)
], Agreement.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Property_1.Property, property => property.agreements, { onDelete: 'CASCADE' }),
    __metadata("design:type", Property_1.Property)
], Agreement.prototype, "property", void 0);
exports.Agreement = Agreement = __decorate([
    (0, typeorm_1.Entity)()
], Agreement);
