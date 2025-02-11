import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./create-orderItem.dto";
import { IsOptional } from "class-validator";

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    quantity?: number;

    // --- Relational fields ---
}
