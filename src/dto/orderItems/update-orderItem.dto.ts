import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./create-orderItem.dto";
import * as cv from "class-validator";

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
