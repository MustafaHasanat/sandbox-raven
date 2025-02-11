import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsDecimal, IsUrl, IsInt } from "class-validator";

export class CreateItemDto {
    // --- Original fields ---

    @MaxLength(25)
    @ApiProperty({
        required: true,
        description: "",
    })
    name: string;

    @IsDecimal()
    @ApiProperty({
        required: true,
        description: "",
    })
    price: number;

    @MaxLength(1000)
    @ApiProperty({
        required: true,
        description: "",
    })
    description: string;

    @IsUrl()
    @ApiProperty({
        required: true,
        description: "",
    })
    image: string;

    @IsInt()
    @ApiProperty({
        required: true,
        description: "",
    })
    quantity: number;

    // --- Relational fields ---
}
