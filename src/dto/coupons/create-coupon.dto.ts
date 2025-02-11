import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsDecimal } from "class-validator";

export class CreateCouponDto {
    // --- Original fields ---

    @MaxLength(25)
    @ApiProperty({
        required: true,
        description: "",
    })
    code: string;

    @ApiProperty({
        required: false,
        description: "",
    })
    percent?: number;

    @IsDecimal()
    @ApiProperty({
        required: false,
        description: "",
    })
    amount?: number;

    // --- Relational fields ---
}
