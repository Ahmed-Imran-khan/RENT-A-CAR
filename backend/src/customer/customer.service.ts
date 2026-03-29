import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    ) { }

    async create(data: Partial<Customer>) {
        return await this.customerModel.create(data);
    }

    async findAll() {
        return await this.customerModel.find();
    }

    async findOne(id: string) {
        const customer = await this.customerModel.findById(id);
        if (!customer) throw new NotFoundException('Customer not found');
        return customer;
    }

    async update(id: string, data: Partial<Customer>) {
        return await this.customerModel.findByIdAndUpdate(id, data, { new: true });
    }

    async remove(id: string) {
        await this.customerModel.findByIdAndDelete(id);
        return { message: 'Customer deleted successfully' };
    }
}