import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateItemDto } from "./create-item.dto";
import { IsOptional } from "class-validator";

export class UpdateItemDto extends PartialType(CreateItemDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    price?: number;

    @IsOptional()
    @ApiProperty({ required: false })
    description?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    image?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    quantity?: number;

    // --- Relational fields ---

    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related collection ID",
    })
    collection?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related business ID",
    })
    business?: string;
}
