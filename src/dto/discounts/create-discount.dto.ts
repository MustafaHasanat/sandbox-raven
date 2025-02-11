import { ApiProperty } from "@nestjs/swagger";
import {} from "class-validator";

export class CreateDiscountDto {
    // --- Original fields ---

    @ApiProperty({
        required: true,
        description: "",
    })
    percent: number;

    // --- Relational fields ---

    @ApiProperty({
        required: true,
        description: "enter the related business ID",
    })
    business: string;
}
