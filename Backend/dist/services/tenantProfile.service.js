"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTenantProfile = exports.getTenantProfileByUserId = exports.getAllTenants = exports.createTenantProfile = void 0;
const datasource_1 = __importDefault(require("../database/datasource"));
const TenantProfile_1 = require("../entities/TenantProfile");
const User_1 = require("../entities/User");
const tenantProfileRepo = datasource_1.default.getRepository(TenantProfile_1.TenantProfile);
const userRepo = datasource_1.default.getRepository(User_1.User);
// create tenant profile 
const createTenantProfile = async (userId, identityDocumentUrl) => {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user)
        throw new Error("User not found");
    if (user.role !== "tenant")
        throw new Error("User is not a tenant ");
    const profile = tenantProfileRepo.create({
        user,
        identityDocumentUrl,
        isVerified: false
    });
    return await tenantProfileRepo.save(profile);
};
exports.createTenantProfile = createTenantProfile;
// get all tenants  
const getAllTenants = async () => {
    const tenants = await tenantProfileRepo.find({
        relations: ["user"],
        order: { user: { id: 'ASC' } } // include User details
    });
    console.log("Tenants from controller", tenants);
    return tenants;
};
exports.getAllTenants = getAllTenants;
// to get tenant profile by user id 
const getTenantProfileByUserId = async (tenantId) => {
    const profile = await tenantProfileRepo.findOne({
        where: { user: { id: tenantId } },
        relations: ["user"]
    });
    return profile;
};
exports.getTenantProfileByUserId = getTenantProfileByUserId;
// to verify the tenant by admin 
const verifyTenantProfile = async (userId, isVerified) => {
    // find profile by user relation
    const profile = await tenantProfileRepo.findOne({
        where: { user: { id: userId } },
        relations: ["user"],
    });
    if (!profile)
        throw new Error("Tenant profile not found");
    profile.isVerified = isVerified;
    return await tenantProfileRepo.save(profile);
};
exports.verifyTenantProfile = verifyTenantProfile;
