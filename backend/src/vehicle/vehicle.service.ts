import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './vehicle.schema';

@Injectable()
export class VehicleService {
    constructor(
        @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    ) { }

    async create(data: Partial<Vehicle>) {
        return await this.vehicleModel.create(data);
    }

    async findAll() {
        return await this.vehicleModel.find();
    }

    async findOne(id: string) {
        const vehicle = await this.vehicleModel.findById(id);
        if (!vehicle) throw new NotFoundException('Vehicle not found');
        return vehicle;
    }

    async update(id: string, data: Partial<Vehicle>) {
        return await this.vehicleModel.findByIdAndUpdate(id, data, { new: true });
    }

    async remove(id: string) {
        await this.vehicleModel.findByIdAndDelete(id);
        return { message: 'Vehicle deleted successfully' };
    }
}