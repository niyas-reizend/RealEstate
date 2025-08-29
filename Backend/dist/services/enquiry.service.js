"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyToEnquiry = exports.getEnquiriesByOwner = exports.getEnquiriesByTenant = exports.createEnquiry = void 0;
// services/EnquiryService.ts
const Enquiry_1 = require("../entities/Enquiry");
const User_1 = require("../entities/User");
const Property_1 = require("../entities/Property");
const datasource_1 = __importDefault(require("../database/datasource"));
const enquiryRepo = datasource_1.default.getRepository(Enquiry_1.Enquiry);
const userRepo = datasource_1.default.getRepository(User_1.User);
const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
// create enquiry  
const createEnquiry = async ({ tenantId, propertyId, message }) => {
    const tenant = await userRepo.findOneBy({ id: tenantId });
    if (!tenant)
        throw new Error("Tenant not found");
    const property = await propertyRepo.findOneBy({ id: propertyId });
    if (!property)
        throw new Error("Property not found");
    const newEnquiry = enquiryRepo.create({
        tenant,
        property,
        message,
    });
    return await enquiryRepo.save(newEnquiry);
};
exports.createEnquiry = createEnquiry;
// get enquiry by tenant ID 
const getEnquiriesByTenant = async (tenantId) => {
    const tenant = await userRepo.findOne({ where: { id: tenantId } });
    if (!tenant)
        throw new Error("Tenant not found");
    const enquiries = await enquiryRepo.find({
        where: { tenant: { id: tenantId } },
        relations: ["property"], // include property details
        order: { createdAt: "DESC" }, // latest first
    });
    return enquiries;
};
exports.getEnquiriesByTenant = getEnquiriesByTenant;
// get the enquiry by Owner Id 
const getEnquiriesByOwner = async (ownerId) => {
    // check if owner exists
    const owner = await userRepo.findOne({ where: { id: ownerId } });
    if (!owner)
        throw new Error("Owner not found");
    // fetch enquiries for all properties owned by this owner
    const enquiries = await enquiryRepo.find({
        where: { property: { owner: { id: ownerId } } },
        relations: ["tenant", "property"], // include both tenant and property details
        order: { createdAt: "DESC" },
    });
    return enquiries;
};
exports.getEnquiriesByOwner = getEnquiriesByOwner;
// reply to enquiry 
const replyToEnquiry = async (id, reply) => {
    const enquiry = await enquiryRepo.findOneBy({ id });
    if (!enquiry) {
        throw new Error("Enquiry not found");
    }
    enquiry.reply = reply;
    await enquiryRepo.save(enquiry);
    return enquiry;
};
exports.replyToEnquiry = replyToEnquiry;
