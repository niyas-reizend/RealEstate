"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAgreementsByOwnerId = exports.handleGetAgreementsByTenantId = exports.getAgreementByIdController = exports.handleGetAllAgreements = exports.createAgreementController = void 0;
const agreement_service_1 = require("../services/agreement.service");
const createAgreementController = async (req, res) => {
    try {
        const newAgreement = await (0, agreement_service_1.createAgreement)(req.body);
        return res.status(201).json(newAgreement);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
exports.createAgreementController = createAgreementController;
// get all the agreement 
const handleGetAllAgreements = async (req, res) => {
    try {
        const agreements = await (0, agreement_service_1.getAllAgreements)();
        res.json(agreements);
    }
    catch (error) {
        console.error("Error fetching agreements:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.handleGetAllAgreements = handleGetAllAgreements;
const getAgreementByIdController = async (req, res) => {
    try {
        const agreementId = parseInt(req.params.id);
        const agreement = await (0, agreement_service_1.getAgreementById)(agreementId);
        return res.json(agreement);
    }
    catch (err) {
        return res.status(404).json({ message: err.message });
    }
};
exports.getAgreementByIdController = getAgreementByIdController;
// Get agreements by tenantId
const handleGetAgreementsByTenantId = async (req, res) => {
    try {
        const tenantId = req.user.id;
        const agreements = await (0, agreement_service_1.getAgreementsByTenantId)(tenantId);
        return res.status(200).json({
            agreements
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.handleGetAgreementsByTenantId = handleGetAgreementsByTenantId;
// Get agreements by ownerId
const handleGetAgreementsByOwnerId = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const agreements = await (0, agreement_service_1.getAgreementsByOwnerId)(ownerId);
        return res.json(agreements);
    }
    catch (err) {
        return res.status(404).json({ message: err.message });
    }
};
exports.handleGetAgreementsByOwnerId = handleGetAgreementsByOwnerId;
