import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CouponsModule } from "../coupons/coupons.module";
import { BusinessesModule } from "../businesses/businesses.module";
import { UsersModule } from "../users/users.module";

import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Order } from "src/entities/order.entity";

@Module({
    imports: [
        CouponsModule,
        BusinessesModule,
        UsersModule,
        TypeOrmModule.forFeature([Order]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {}
