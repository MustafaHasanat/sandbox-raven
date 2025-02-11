import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";

export class CreateCaramelDto {
    // --- Original fields ---

    @MaxLength(30)
    @ApiProperty({
        required: true,
        description: "",
    })
    identifier: string;

    @ApiProperty({
        required: true,
        description: "",
    })
    content: string;

    // --- Relational fields ---
}
