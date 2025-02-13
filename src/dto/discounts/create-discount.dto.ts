import { ApiProperty } from "@nestjs/swagger";

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
