import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessesModule } from "../businesses/businesses.module";

import { DiscountsService } from "./discounts.service";
import { DiscountsController } from "./discounts.controller";
import { Discount } from "src/entities/discount.entity";

@Module({
    imports: [BusinessesModule, TypeOrmModule.forFeature([Discount])],
    controllers: [DiscountsController],
    providers: [DiscountsService],
    exports: [DiscountsService],
})
export class DiscountsModule {}
