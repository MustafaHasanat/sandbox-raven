import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateOrderItemDto {
    // --- Original fields ---

    @IsInt()
    @ApiProperty({
        required: true,
        description: "",
    })
    quantity: number;

    // --- Relational fields ---
}
