import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateItemDto } from "./create-item.dto";
import * as cv from "class-validator";

export class UpdateItemDto extends PartialType(CreateItemDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
