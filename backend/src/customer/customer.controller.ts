import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Post()
    create(@Body() body: { name: string; email: string; phone: string; address: string }) {
        return this.customerService.create(body);
    }

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<{ name: string; email: string; phone: string; address: string }>) {
        return this.customerService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerService.remove(id);
    }
}