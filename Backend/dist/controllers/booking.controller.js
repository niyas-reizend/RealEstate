"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetBookedPropertiesByIdOwnerId = exports.handleGetOwnerBookings = exports.handleGetTenantBookings = exports.updateBookingStatusController = exports.handleCreateBooking = void 0;
const Booking_1 = require("../entities/Booking");
const booking_service_1 = require("../services/booking.service");
// create booking 
const handleCreateBooking = async (req, res) => {
    try {
        const tenantId = req.user.id;
        const { propertyId, rentAmount, fixedDeposit, agreementStartDate, agreementEndDate } = req.body;
        const booking = await (0, booking_service_1.createBooking)(tenantId, propertyId, rentAmount, fixedDeposit, agreementStartDate, agreementEndDate);
        res.status(201).json({ message: "Booking created successfully", booking });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.handleCreateBooking = handleCreateBooking;
// updating or approving the booking 
const updateBookingStatusController = async (req, res) => {
    try {
        const { bookingId, status } = req.body;
        // Validate bookingId
        if (!bookingId || isNaN(Number(bookingId))) {
            return res.status(400).json({ error: "Invalid or missing bookingId" });
        }
        // Validate status value
        const isValidStatus = Object.values(Booking_1.BookingStatus).includes(status);
        if (!isValidStatus) {
            return res.status(400).json({ error: "Invalid booking status" });
        }
        // Call service
        const result = await (0, booking_service_1.updateBookingStatus)(Number(bookingId), status);
        if (result?.success) {
            return res.status(200).json({ message: result.message, agreementDetails: result.agreementDetails, commission: result.commission });
        }
    }
    catch (err) {
        return res.status(500).json({
            error: err.message || "An error occurred while updating booking status",
        });
    }
};
exports.updateBookingStatusController = updateBookingStatusController;
// export const handleGetBookingsForProperty = async (req: Request, res: Response) => {
//   try {
//     const { propertyId } = req.params;
//     const bookings = await getBookingsForProperty(parseInt(propertyId));
//     res.json(bookings);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };
// get the bookings done by the tenant 
const handleGetTenantBookings = async (req, res) => {
    try {
        const tenantId = req.user.id;
        const bookings = await (0, booking_service_1.getTenantBookings)((tenantId));
        res.json(bookings);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.handleGetTenantBookings = handleGetTenantBookings;
// get the bookings related to the owner 
const handleGetOwnerBookings = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const bookings = await (0, booking_service_1.getOwnerBookings)((ownerId));
        res.json(bookings);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.handleGetOwnerBookings = handleGetOwnerBookings;
// get booked properties by owner id 
const handleGetBookedPropertiesByIdOwnerId = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const BookedProperties = await (0, booking_service_1.getBookedPropertiesByOwnerId)(ownerId);
        res.json(BookedProperties);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.handleGetBookedPropertiesByIdOwnerId = handleGetBookedPropertiesByIdOwnerId;
