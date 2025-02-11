import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";

export class CreateCollectionDto {
    // --- Original fields ---

    @MaxLength(25)
    @ApiProperty({
        required: true,
        description: "",
    })
    name: string;

    // --- Relational fields ---

    @ApiProperty({
        required: true,
        description: "enter the related business ID",
    })
    business: string;
}
