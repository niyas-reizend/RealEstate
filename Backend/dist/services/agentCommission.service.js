"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommissionById = exports.getAllCommissionsByAgentId = void 0;
const datasource_1 = __importDefault(require("../database/datasource"));
const AgentCommission_1 = require("../entities/AgentCommission");
const Booking_1 = require("../entities/Booking");
const Property_1 = require("../entities/Property");
const User_1 = require("../entities/User");
const commissionRepo = datasource_1.default.getRepository(AgentCommission_1.AgentCommission);
const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
const userRepo = datasource_1.default.getRepository(User_1.User);
const bookinRepo = datasource_1.default.getRepository(Booking_1.Booking);
// export const createAgentCommission = async (
//   agentId: number,
//   propertyId: number,
// ) => {
//   const agent = await userRepo.findOneBy({ id: agentId });
//   const property = await propertyRepo.findOne({
//     where: { id: propertyId }
//   });
//   if (!agent || !property) throw new Error("Agent or Property not found");
//   const existing = await commissionRepo.findOneBy({
//     property: { id: propertyId },
//   });
//   if (existing) throw new Error("Commission for this property already exists");
//   const booking = await bookinRepo.findOne({where:{property:{id:propertyId}}})
//   console.log(booking)
//   if (!property.agreements) throw new Error("No agreement found for this property");
//   const rentAmount = parseFloat(property.agreements.rentAmount.toString());
// const rentAmount = booking?.property?.rentAmount
// const commissionAmount = rentAmount * 0.5;
// const commission = commissionRepo.create({
//   agent,
//   property,
//   commissionAmount,
// });
// return await commissionRepo.save(commission);
// };
const getAllCommissionsByAgentId = async (agentId) => {
    return await commissionRepo.find({
        where: { agent: { id: agentId } },
        relations: ["agent", "property", "property.owner"],
        order: { createdAt: "DESC" }
    });
};
exports.getAllCommissionsByAgentId = getAllCommissionsByAgentId;
const getCommissionById = async (id) => {
    const commission = await commissionRepo.findOne({
        where: { id },
        relations: ["agent", "property"]
    });
    if (!commission)
        throw new Error("Commission not found");
    return commission;
};
exports.getCommissionById = getCommissionById;
