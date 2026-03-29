import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleService: VehicleService) { }

    @Post()
    create(@Body() body: { make: string; model: string; year: number; licensePlate: string; dailyRate: number }) {
        return this.vehicleService.create(body);
    }

    @Get()
    findAll() {
        return this.vehicleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehicleService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<{ make: string; model: string; year: number; licensePlate: string; dailyRate: number; status: string }>) {
        return this.vehicleService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehicleService.remove(id);
    }
}