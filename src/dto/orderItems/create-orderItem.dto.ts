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

    @ApiProperty({ required: true, description: "enter the related order ID" })
    order: string;
    @ApiProperty({ required: true, description: "enter the related item ID" })
    item: string;
    @ApiProperty({
        required: true,
        description: "enter the related business ID",
    })
    business: string;
    @ApiProperty({ required: true, description: "enter the related user ID" })
    user: string;
}
