import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCouponDto } from "./create-coupon.dto";
import * as cv from "class-validator";

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
