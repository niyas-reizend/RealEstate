"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReplyToEnquiry = exports.handleGetEnquiriesByOwner = exports.handleGetTenantEnquiries = exports.handleCreateEnquiry = void 0;
const enquiry_service_1 = require("../services/enquiry.service");
// create enquiry
const handleCreateEnquiry = async (req, res) => {
    try {
        const tenantId = req.user.id;
        const { propertyId, message } = req.body;
        const enquiry = await (0, enquiry_service_1.createEnquiry)({ tenantId, propertyId, message });
        return res.status(201).json({
            message: "Enquiry created successfully",
            data: enquiry,
        });
    }
    catch (err) {
        console.error("Error creating enquiry:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.handleCreateEnquiry = handleCreateEnquiry;
// get enquiry by tenant id 
const handleGetTenantEnquiries = async (req, res) => {
    try {
        const tenantId = req.user.id; // from auth middleware
        const enquiries = await (0, enquiry_service_1.getEnquiriesByTenant)(tenantId);
        return res.status(200).json({
            message: "Enquiries fetched successfully",
            data: enquiries,
        });
    }
    catch (err) {
        console.error("Error fetching enquiries:", err);
        return res.status(500).json({ message: err.message || "Internal server error" });
    }
};
exports.handleGetTenantEnquiries = handleGetTenantEnquiries;
// get enquiry by owner ID 
const handleGetEnquiriesByOwner = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const enquiries = await (0, enquiry_service_1.getEnquiriesByOwner)(ownerId);
        res.status(200).json(enquiries);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Error fetching enquiries" });
    }
};
exports.handleGetEnquiriesByOwner = handleGetEnquiriesByOwner;
// reply to Enquiry 
const handleReplyToEnquiry = async (req, res) => {
    console.log("APi calllllllllllll");
    try {
        const enquiryId = parseInt(req.params.id);
        const { reply } = req.body;
        if (!reply) {
            return res.status(400).json({ message: "Reply message is required" });
        }
        const updatedEnquiry = await (0, enquiry_service_1.replyToEnquiry)(enquiryId, reply);
        res.status(200).json(updatedEnquiry);
    }
    catch (err) {
        res.status(500).json({ message: err.message || "Internal server error" });
    }
};
exports.handleReplyToEnquiry = handleReplyToEnquiry;
