import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCollectionDto } from "./create-collection.dto";
import * as cv from "class-validator";

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
