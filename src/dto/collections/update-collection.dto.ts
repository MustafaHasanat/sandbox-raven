import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCollectionDto } from "./create-collection.dto";
import { IsOptional } from "class-validator";

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    // --- Relational fields ---
}
