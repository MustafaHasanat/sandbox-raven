import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersModule } from "../orders/orders.module";
import { ItemsModule } from "../items/items.module";
import { BusinessesModule } from "../businesses/businesses.module";
import { UsersModule } from "../users/users.module";

import { OrderItemsService } from "./orderItems.service";
import { OrderItemsController } from "./orderItems.controller";
import { OrderItem } from "src/entities/orderItem.entity";

@Module({
    imports: [
        OrdersModule,
        ItemsModule,
        BusinessesModule,
        UsersModule,
        TypeOrmModule.forFeature([OrderItem]),
    ],
    controllers: [OrderItemsController],
    providers: [OrderItemsService],
    exports: [OrderItemsService],
})
export class OrderItemsModule {}
