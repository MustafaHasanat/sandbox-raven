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
}
