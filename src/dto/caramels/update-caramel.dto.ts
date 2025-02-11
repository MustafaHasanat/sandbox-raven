import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCaramelDto } from "./create-caramel.dto";
import { IsOptional } from "class-validator";

export class UpdateCaramelDto extends PartialType(CreateCaramelDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    identifier?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    content?: string;

    // --- Relational fields ---
}
