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
exports.Property = exports.ApprovalStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Enquiry_1 = require("./Enquiry");
const AgentCommission_1 = require("./AgentCommission");
const Agreement_1 = require("./Agreement");
const Booking_1 = require("./Booking");
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "pending";
    ApprovalStatus["APPROVED"] = "approved";
    ApprovalStatus["REJECTED"] = "rejected";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
let Property = class Property {
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Property.prototype, "rentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Property.prototype, "fixedDepositAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true }),
    __metadata("design:type", Array)
], Property.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true }),
    __metadata("design:type", Array)
], Property.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ApprovalStatus,
        default: "pending"
    }),
    __metadata("design:type", String)
], Property.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.properties, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "ownerId" }),
    __metadata("design:type", User_1.User)
], Property.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Property.prototype, "agentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.handledProperties, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "agentId" }),
    __metadata("design:type", User_1.User)
], Property.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Property.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Property.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Enquiry_1.Enquiry, enquiry => enquiry.property),
    __metadata("design:type", Array)
], Property.prototype, "enquiries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, (booking) => booking.property),
    __metadata("design:type", Array)
], Property.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Agreement_1.Agreement, agreement => agreement.property),
    __metadata("design:type", Array)
], Property.prototype, "agreements", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => AgentCommission_1.AgentCommission, commission => commission.property),
    __metadata("design:type", AgentCommission_1.AgentCommission)
], Property.prototype, "commission", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)()
], Property);
