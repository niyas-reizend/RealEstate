"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVerifyTenantProfile = exports.getTenantProfile = exports.handleGetAllTenants = exports.handleCreateTenantProfile = void 0;
const tenantProfile_service_1 = require("../services/tenantProfile.service");
// create tenant profile 
const handleCreateTenantProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!req.file)
            throw new Error("Identity document is required");
        const identityDocumentUrl = `/uploads/${req.file.filename}`;
        const profile = await (0, tenantProfile_service_1.createTenantProfile)(userId, identityDocumentUrl);
        res.status(201).json({ message: "Tenant profile created", profile });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.handleCreateTenantProfile = handleCreateTenantProfile;
// get all tenants 
const handleGetAllTenants = async (req, res) => {
    try {
        const tenants = await (0, tenantProfile_service_1.getAllTenants)();
        res.json(tenants);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch tenants" });
    }
};
exports.handleGetAllTenants = handleGetAllTenants;
// to get tenant profile by user id 
const getTenantProfile = async (req, res) => {
    try {
        const tenantId = req.user.id;
        const result = await (0, tenantProfile_service_1.getTenantProfileByUserId)(tenantId);
        if (!result)
            return res.status(404).json({ message: "Profile not found" });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getTenantProfile = getTenantProfile;
// to verify the tenant profile by the admin 
const handleVerifyTenantProfile = async (req, res) => {
    try {
        const { userId, isVerified } = req.body;
        const profile = await (0, tenantProfile_service_1.verifyTenantProfile)(userId, isVerified);
        res.json({ message: "Tenant profile updated", profile });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.handleVerifyTenantProfile = handleVerifyTenantProfile;
