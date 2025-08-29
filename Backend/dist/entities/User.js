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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Property_1 = require("./Property");
const Agreement_1 = require("./Agreement");
const AgentCommission_1 = require("./AgentCommission");
const ResetToken_1 = require("./ResetToken");
const Enquiry_1 = require("./Enquiry");
const TenantProfile_1 = require("./TenantProfile");
const Booking_1 = require("./Booking");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['admin', 'tenant', 'owner', 'agent'] }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isBlocked", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Property_1.Property, property => property.owner),
    __metadata("design:type", Array)
], User.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, (booking) => booking.tenant),
    __metadata("design:type", Array)
], User.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Property_1.Property, property => property.agent),
    __metadata("design:type", Array)
], User.prototype, "handledProperties", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => TenantProfile_1.TenantProfile, tenantProfile => tenantProfile.user),
    __metadata("design:type", TenantProfile_1.TenantProfile)
], User.prototype, "tenantProfile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Enquiry_1.Enquiry, enquiry => enquiry.tenant),
    __metadata("design:type", Array)
], User.prototype, "enquiries", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Agreement_1.Agreement, agreement => agreement.tenant),
    __metadata("design:type", Agreement_1.Agreement)
], User.prototype, "tenantAgreement", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Agreement_1.Agreement, agreement => agreement.owner),
    __metadata("design:type", Array)
], User.prototype, "ownerAgreements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AgentCommission_1.AgentCommission, commission => commission.agent),
    __metadata("design:type", Array)
], User.prototype, "commissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ResetToken_1.ResetToken, token => token.user),
    __metadata("design:type", Array)
], User.prototype, "resetTokens", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
