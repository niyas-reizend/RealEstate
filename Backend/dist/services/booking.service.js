"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookedPropertiesByOwnerId = exports.getOwnerBookings = exports.getTenantBookings = exports.updateBookingStatus = exports.createBooking = void 0;
const datasource_1 = __importDefault(require("../database/datasource"));
const AgentCommission_1 = require("../entities/AgentCommission");
const Agreement_1 = require("../entities/Agreement");
const Booking_1 = require("../entities/Booking");
const Property_1 = require("../entities/Property");
const TenantProfile_1 = require("../entities/TenantProfile");
const User_1 = require("../entities/User");
const bookingRepo = datasource_1.default.getRepository(Booking_1.Booking);
const propertyRepo = datasource_1.default.getRepository(Property_1.Property);
const userRepo = datasource_1.default.getRepository(User_1.User);
const agreementRepo = datasource_1.default.getRepository(Agreement_1.Agreement);
const commisionRepo = datasource_1.default.getRepository(AgentCommission_1.AgentCommission);
const tenantProfileRepo = datasource_1.default.getRepository(TenantProfile_1.TenantProfile);
// create booking
const createBooking = async (tenantId, propertyId, rentAmount, fixedDeposit, agreementStartDate, agreementEndDate) => {
    const property = await propertyRepo.findOne({
        where: { id: propertyId },
        relations: ["owner"],
    });
    if (!property)
        throw new Error("Property not found");
    const tenant = await tenantProfileRepo.findOne({
        where: { user: { id: tenantId } },
        relations: ["user"],
    });
    if (!tenant)
        throw new Error("tenant profile doesnt exists");
    if (!tenant.isVerified)
        throw new Error("tenant is not verified,you have to get verified before booking");
    // if(!verifiedTenant && !verifiedTenant.isVerified) throw new Error("tenant not verified")
    const booking = bookingRepo.create({
        tenant: tenant?.user,
        property,
        rentAmount,
        fixedDeposit,
        agreementStartDate,
        agreementEndDate,
        status: Booking_1.BookingStatus.PENDING,
    });
    return await bookingRepo.save(booking);
};
exports.createBooking = createBooking;
// approve or update booking status
const updateBookingStatus = async (bookingId, status) => {
    try {
    }
    catch (err) { }
    const booking = await bookingRepo.findOne({
        where: { id: bookingId },
        relations: ["tenant", "property", "property.owner", "property.agent"],
    });
    if (!booking)
        throw new Error("Booking not found");
    booking.status = status;
    if (status === Booking_1.BookingStatus.REJECTED || status === Booking_1.BookingStatus.PENDING) {
        let data = await bookingRepo.save(booking);
        return { success: true, message: "updated successfully", data };
    }
    //   If status is "confirmed", create agreement first
    if (status === Booking_1.BookingStatus.CONFIRMED) {
        // console.log(booking);
        // check if tenant already has an agreement
        const existingAgreement = await agreementRepo.findOne({
            where: { tenant: { id: booking.tenant.id } },
        });
        if (existingAgreement) {
            throw new Error("This tenant already has an agreement.");
        }
        // Create agreement using booking details
        const agreement = agreementRepo.create({
            rentAmount: booking?.rentAmount,
            fixedDeposit: booking?.fixedDeposit,
            startDate: booking?.agreementStartDate,
            endDate: booking?.agreementEndDate,
            tenant: booking?.tenant,
            owner: booking?.property.owner,
            property: booking?.property,
        });
        booking.status = Booking_1.BookingStatus.CREATED;
        await bookingRepo.save(booking);
        const test = await bookingRepo.find({ where: { id: bookingId } });
        let agreementDetails = await agreementRepo.save(agreement);
        let agentIdforCommision = booking.property.agent;
        let commissionproperty = booking.property;
        let rentforCommision = booking.rentAmount * 0.5;
        const commission = commisionRepo.create({
            agent: agentIdforCommision,
            property: commissionproperty,
            commissionAmount: rentforCommision,
        });
        await commisionRepo.save(commission);
        return {
            success: true,
            message: "Agreement created successfully",
            agreementDetails,
            commission,
        };
    }
};
exports.updateBookingStatus = updateBookingStatus;
// export const getBookingsForProperty = async (propertyId: number) => {
//   return await bookingRepo.find({
//     where: { property: { id: propertyId } },
//     relations: ["tenant", "property"]
//   });
// };
// get the booking of the tenant
const getTenantBookings = async (tenantId) => {
    return await bookingRepo.find({
        where: { tenant: { id: tenantId } },
        relations: ["tenant", "property"],
    });
};
exports.getTenantBookings = getTenantBookings;
// get the bookings related to that owner
const getOwnerBookings = async (ownerId) => {
    return await bookingRepo.find({
        where: { property: { owner: { id: ownerId } } },
        relations: ["tenant", "property"],
        order: { bookingDate: "ASC" },
    });
};
exports.getOwnerBookings = getOwnerBookings;
// get booked properties by owner id 
const getBookedPropertiesByOwnerId = async (ownerId) => {
    return await bookingRepo.find({
        where: { property: { owner: { id: ownerId } } },
        relations: ["property"]
    });
};
exports.getBookedPropertiesByOwnerId = getBookedPropertiesByOwnerId;
