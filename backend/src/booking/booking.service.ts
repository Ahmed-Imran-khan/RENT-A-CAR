import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { Vehicle, VehicleDocument } from '../vehicle/vehicle.schema';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
        @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    ) { }

    async create(data: Partial<Booking>) {
        const booking = await this.bookingModel.create(data);
        await this.vehicleModel.findByIdAndUpdate(data.vehicleId, { status: 'booked' });
        return booking;
    }

    async findAll() {
        return await this.bookingModel
            .find()
            .populate('customerId')
            .populate('vehicleId');
    }

    async findOne(id: string) {
        const booking = await this.bookingModel
            .findById(id)
            .populate('customerId')
            .populate('vehicleId');
        if (!booking) throw new NotFoundException('Booking not found');
        return booking;
    }

    async complete(id: string) {
        const booking = await this.bookingModel.findById(id);
        if (!booking) throw new NotFoundException('Booking not found');
        await this.vehicleModel.findByIdAndUpdate(booking.vehicleId, { status: 'available' });
        return await this.bookingModel.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
    }

    async remove(id: string) {
        const booking = await this.bookingModel.findById(id);
        if (!booking) throw new NotFoundException('Booking not found');
        await this.vehicleModel.findByIdAndUpdate(booking.vehicleId, { status: 'available' });
        await this.bookingModel.findByIdAndDelete(id);
        return { message: 'Booking deleted successfully' };
    }

    async getDashboardStats() {
        const totalBookings = await this.bookingModel.countDocuments();
        const totalRevenue = await this.bookingModel.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ]);
        return {
            totalBookings,
            totalRevenue: totalRevenue[0]?.total || 0,
        };
    }
}