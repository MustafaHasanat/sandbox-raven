import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrderItemsService } from "./orderItems.service";
import { OrderItemsController } from "./orderItems.controller";
import { OrderItem } from "src/entities/orderItem.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    controllers: [OrderItemsController],
    providers: [OrderItemsService],
    exports: [OrderItemsService],
})
export class OrderItemsModule {}
