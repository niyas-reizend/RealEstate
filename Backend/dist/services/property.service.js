"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProperty = exports.updatePropertyApprovalStatus = exports.deletePropertyById = exports.getAllPropertiesForTenants = exports.getPropertyById = exports.getPropertiesByAgent = exports.getPropertiesByOwner = exports.getUnverifiedProperties = exports.getAllProperties = exports.addProperty = void 0;
const datasource_1 = __importDefault(require("../database/datasource"));
const Property_1 = require("../entities/Property");
const User_1 = require("../entities/User");
const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
const userRepo = datasource_1.default.getRepository(User_1.User);
// to add property 
const addProperty = async (data) => {
    const owner = await userRepo.findOneBy({ id: data.ownerId, role: "owner" });
    if (!owner)
        throw new Error("Owner not found");
    if (owner.role !== "owner")
        throw new Error("User is not an Owner");
    // console.log(data.agentId);
    const agent = await userRepo.findOneBy({ id: data.agentId, role: "agent" });
    if (!agent)
        throw new Error("Agent not found");
    const property = propertyRepo.create({
        title: data.title,
        description: data.description,
        rentAmount: data.rentAmount,
        fixedDepositAmount: data.fixedDepositAmount,
        address: data.address,
        city: data.city,
        state: data.state,
        images: data.images,
        amenities: data.amenities,
        owner,
        isApproved: Property_1.ApprovalStatus.PENDING,
        agent
    });
    return await propertyRepo.save(property);
};
exports.addProperty = addProperty;
// get all property 
const getAllProperties = async () => {
    const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
    return await propertyRepo.find({
        relations: ["owner", "agent"],
        order: { createdAt: "DESC" },
    });
};
exports.getAllProperties = getAllProperties;
// get all unverified Properties 
const getUnverifiedProperties = async () => {
    const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
    return propertyRepo.find({
        where: { isApproved: Property_1.ApprovalStatus.PENDING },
        relations: ["owner", "agent"],
        order: { createdAt: "DESC" }
    });
};
exports.getUnverifiedProperties = getUnverifiedProperties;
// get the properties by owner id 
const getPropertiesByOwner = async (ownerId) => {
    const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
    return propertyRepo.find({
        where: { ownerId },
        relations: ["agent"], // if you want agent details
        order: { createdAt: "DESC" }
    });
};
exports.getPropertiesByOwner = getPropertiesByOwner;
// get the properties by agent id 
const getPropertiesByAgent = async (agentId) => {
    const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
    return propertyRepo.find({
        where: { agentId },
        relations: ["owner", "agent"], // if you want agent details
        order: { createdAt: "DESC" }
    });
};
exports.getPropertiesByAgent = getPropertiesByAgent;
// get the property by property id 
const getPropertyById = async (id) => {
    const property = await propertyRepo.findOne({
        where: { id },
        relations: [
            "owner",
            "agent",
            "enquiries",
            "bookings",
            "agreements",
            "commission"
        ]
    });
    if (!property) {
        throw new Error("Property not found");
    }
    return property;
};
exports.getPropertyById = getPropertyById;
// get all propertis for tenants 
const getAllPropertiesForTenants = async () => {
    const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
    return await propertyRepo.find({ where: { isApproved: Property_1.ApprovalStatus.APPROVED },
        relations: ["owner", "agent"],
        order: { createdAt: "DESC" },
    });
};
exports.getAllPropertiesForTenants = getAllPropertiesForTenants;
// delete property 
const deletePropertyById = async (propertyId) => {
    const property = await propertyRepo.findOneBy({ id: propertyId });
    if (!property)
        return false;
    await propertyRepo.remove(property);
    return true;
};
exports.deletePropertyById = deletePropertyById;
// aprove or reject
const updatePropertyApprovalStatus = async (propertyId, action) => {
    const property = await propertyRepo.findOneBy({ id: propertyId });
    if (!property) {
        throw new Error("Property not found");
    }
    property.isApproved = action === "approve" ? Property_1.ApprovalStatus.APPROVED : Property_1.ApprovalStatus.REJECTED;
    return await propertyRepo.save(property);
};
exports.updatePropertyApprovalStatus = updatePropertyApprovalStatus;
// update or edit property 
const updateProperty = async (id, data) => {
    await propertyRepo.update({ id }, data);
    const updatedProperty = await propertyRepo.findOne({
        where: { id },
        relations: ["agent", "owner", "enquiries", "bookings"]
    });
    return updatedProperty;
};
exports.updateProperty = updateProperty;
