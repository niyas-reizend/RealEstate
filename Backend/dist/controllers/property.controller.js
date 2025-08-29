"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePropertyController = exports.handleAddProperty = exports.handleApproveProperty = exports.handleDeleteProperty = exports.getAgentPropertiesController = exports.getOwnerPropertiesController = exports.handleGetAllPropertiesForTenants = exports.getPropertyByIdController = exports.handleGetUnverifiedProperties = exports.handleGetAllProperties = void 0;
const property_service_1 = require("../services/property.service");
// get all property 
const handleGetAllProperties = async (_req, res) => {
    try {
        const properties = await (0, property_service_1.getAllProperties)();
        res.json(properties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Failed to fetch properties" });
    }
};
exports.handleGetAllProperties = handleGetAllProperties;
// get all the unverified properties 
const handleGetUnverifiedProperties = async (_req, res) => {
    try {
        const properties = await (0, property_service_1.getUnverifiedProperties)();
        res.json(properties);
    }
    catch (error) {
        console.error("Error fetching unverified properties:", error);
        res.status(500).json({ message: "Failed to fetch unverified properties" });
    }
};
exports.handleGetUnverifiedProperties = handleGetUnverifiedProperties;
// get property by property id 
const getPropertyByIdController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid property ID" });
        }
        const property = await (0, property_service_1.getPropertyById)(id);
        return res.status(200).json(property);
    }
    catch (error) {
        if (error.message === "Property not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getPropertyByIdController = getPropertyByIdController;
// get all verified properties for  tenants and admin
const handleGetAllPropertiesForTenants = async (_req, res) => {
    try {
        const properties = await (0, property_service_1.getAllPropertiesForTenants)();
        res.json(properties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Failed to fetch properties" });
    }
};
exports.handleGetAllPropertiesForTenants = handleGetAllPropertiesForTenants;
// get properties by owner id 
const getOwnerPropertiesController = async (req, res) => {
    try {
        const ownerId = req.user.id;
        if (!ownerId) {
            return res.status(400).json({ success: false, message: "Owner ID is required" });
        }
        const properties = await (0, property_service_1.getPropertiesByOwner)(ownerId);
        return res.json({ success: true, data: properties });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to fetch properties" });
    }
};
exports.getOwnerPropertiesController = getOwnerPropertiesController;
// get property by Agent id 
const getAgentPropertiesController = async (req, res) => {
    try {
        const agentId = req.user.id;
        if (!agentId) {
            return res.status(400).json({ success: false, message: "Agent ID is required" });
        }
        const properties = await (0, property_service_1.getPropertiesByAgent)(agentId);
        return res.json({ success: true, data: properties });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to fetch properties" });
    }
};
exports.getAgentPropertiesController = getAgentPropertiesController;
// delete property 
const handleDeleteProperty = async (req, res) => {
    const propertyId = parseInt(req.params.id);
    if (isNaN(propertyId)) {
        return res.status(400).json({ message: "Invalid property ID" });
    }
    try {
        const result = await (0, property_service_1.deletePropertyById)(propertyId);
        if (!result) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.json({ message: "Property deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting property:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.handleDeleteProperty = handleDeleteProperty;
// approve reject property 
const handleApproveProperty = async (req, res) => {
    const { propertyId, action } = req.body; // expects "approve" or "reject"
    try {
        if (!["approve", "reject"].includes(action)) {
            return res.status(400).json({ message: "Invalid action" });
        }
        const updatedProperty = await (0, property_service_1.updatePropertyApprovalStatus)(propertyId, action);
        res.json({
            message: `Property ${action}d successfully`,
            property: updatedProperty,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message || "Server Error" });
    }
};
exports.handleApproveProperty = handleApproveProperty;
// add or create property 
const handleAddProperty = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User id in controller", userId);
        console.log("uploaded images--------", req.files);
        // Get image file paths from multer
        const images = req.files.map(file => `/uploads/${file.filename}`);
        const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
        // Merge body data with image paths
        const propertyData = {
            ...req.body,
            amenities,
            rentAmount: Number(req.body.rentAmount),
            fixedDepositAmount: Number(req.body.fixedDepositAmount),
            ownerId: Number(req.user.id),
            agentId: req.body.agentId,
            images
        };
        const property = await (0, property_service_1.addProperty)(propertyData);
        res.status(201).json({ message: "Property added successfully", property });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.handleAddProperty = handleAddProperty;
// edit or update property 
const updatePropertyController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        let updateData = { ...req.body };
        // Parse amenities JSON string from FormData
        if (updateData.amenities) {
            updateData.amenities = JSON.parse(updateData.amenities);
        }
        const updatedProperty = await (0, property_service_1.updateProperty)(id, updateData);
        // const updatedProperty = await updateProperty(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Property updated successfully",
            updatedProperty
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to update property"
        });
    }
};
exports.updatePropertyController = updatePropertyController;
