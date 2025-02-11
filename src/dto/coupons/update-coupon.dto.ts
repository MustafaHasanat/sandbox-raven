import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCouponDto } from "./create-coupon.dto";
import { IsOptional } from "class-validator";

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    code?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    percent?: number;

    @IsOptional()
    @ApiProperty({ required: false })
    amount?: number;

    // --- Relational fields ---
}
