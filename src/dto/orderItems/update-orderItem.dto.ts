import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./create-orderItem.dto";
import { IsOptional } from "class-validator";

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    quantity?: number;

    // --- Relational fields ---

    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related order ID",
    })
    order?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related item ID",
    })
    item?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related business ID",
    })
    business?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related user ID",
    })
    user?: string;
}
