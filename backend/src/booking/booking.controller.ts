import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Post()
    create(@Body() body: { customerId: any; vehicleId: any; startDate: string; endDate: string; totalAmount: number }) {
        return this.bookingService.create(body);
    }

    @Get()
    findAll() {
        return this.bookingService.findAll();
    }

    @Get('stats')
    getStats() {
        return this.bookingService.getDashboardStats();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(id);
    }

    @Patch(':id/complete')
    complete(@Param('id') id: string) {
        return this.bookingService.complete(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookingService.remove(id);
    }
}