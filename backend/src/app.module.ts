// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/rent_a_car'),
    AuthModule,
    CustomerModule,
    VehicleModule,
    BookingModule,
  ],
})
export class AppModule { }