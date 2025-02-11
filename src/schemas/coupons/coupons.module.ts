import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessesModule } from "../businesses/businesses.module";

import { CouponsService } from "./coupons.service";
import { CouponsController } from "./coupons.controller";
import { Coupon } from "src/entities/coupon.entity";

@Module({
    imports: [BusinessesModule, TypeOrmModule.forFeature([Coupon])],
    controllers: [CouponsController],
    providers: [CouponsService],
    exports: [CouponsService],
})
export class CouponsModule {}
