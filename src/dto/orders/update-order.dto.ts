import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import * as cv from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
