"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgreementsByOwnerId = exports.getAgreementsByTenantId = exports.getAgreementById = exports.getAllAgreements = exports.createAgreement = void 0;
const Agreement_1 = require("../entities/Agreement");
const User_1 = require("../entities/User");
const Property_1 = require("../entities/Property");
const datasource_1 = __importDefault(require("../database/datasource"));
const agreementRepo = datasource_1.default.getRepository(Agreement_1.Agreement);
const userRepo = datasource_1.default.getRepository(User_1.User);
const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
const createAgreement = async (data) => {
    const tenant = await userRepo.findOneBy({ id: data.tenantId });
    const owner = await userRepo.findOneBy({ id: data.ownerId });
    const property = await propertyRepo.findOneBy({ id: data.propertyId });
    if (!tenant || !owner || !property) {
        throw new Error("Invalid tenant, owner, or property ID");
    }
    const agreement = agreementRepo.create({
        rentAmount: data.rentAmount,
        fixedDeposit: data.fixedDeposit,
        startDate: data.startDate,
        endDate: data.endDate,
        tenant,
        owner,
        property,
    });
    return await agreementRepo.save(agreement);
};
exports.createAgreement = createAgreement;
// get all agreement 
const getAllAgreements = async () => {
    const agreementRepo = datasource_1.default.getRepository(Agreement_1.Agreement);
    return await agreementRepo.find({
        relations: ["tenant", "owner", "property", "property.agent"],
        order: { createdAt: "DESC" },
    });
};
exports.getAllAgreements = getAllAgreements;
// get agreement by agreement id 
const getAgreementById = async (id) => {
    const agreement = await agreementRepo.findOne({
        where: { id },
        relations: ["tenant", "owner", "property"],
    });
    if (!agreement)
        throw new Error("Agreement not found");
    return agreement;
};
exports.getAgreementById = getAgreementById;
// Get agreements by tenantId
const getAgreementsByTenantId = async (tenantId) => {
    const agreements = await agreementRepo.find({
        where: { tenant: { id: tenantId } },
        relations: ["tenant", "property", "property.agent", "owner"], // optional, include related entities
    });
    if (!agreements || agreements.length === 0) {
        throw new Error("No agreements found for this tenant");
    }
    return agreements;
};
exports.getAgreementsByTenantId = getAgreementsByTenantId;
// Get agreements by tenantId
const getAgreementsByOwnerId = async (ownerId) => {
    console.log(ownerId);
    const agreements = await agreementRepo.find({
        where: { owner: { id: ownerId } },
        relations: ["tenant", "property", "property.agent", "owner"], // to get all the details related to agreement 
    });
    if (!agreements || agreements.length === 0) {
        throw new Error("No agreements found for this owner");
    }
    return agreements;
};
exports.getAgreementsByOwnerId = getAgreementsByOwnerId;
