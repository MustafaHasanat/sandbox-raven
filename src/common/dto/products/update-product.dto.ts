import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
import * as ClassValidators from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
