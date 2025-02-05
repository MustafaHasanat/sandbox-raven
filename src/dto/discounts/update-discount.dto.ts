import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDiscountDto } from "./create-discount.dto";
import * as cv from "class-validator";

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
