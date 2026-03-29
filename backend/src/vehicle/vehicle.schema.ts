import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
    @Prop({ required: true })
    make: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    year: number;

    @Prop({ required: true, unique: true })
    licensePlate: string;

    @Prop({ required: true })
    dailyRate: number;

    @Prop({ default: 'available' })
    status: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);