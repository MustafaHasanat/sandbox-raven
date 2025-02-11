import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDiscountDto } from "./create-discount.dto";
import { IsOptional } from "class-validator";

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    percent?: number;

    // --- Relational fields ---
}
