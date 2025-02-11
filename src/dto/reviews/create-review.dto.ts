import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsInt, IsUrl } from "class-validator";

export class CreateReviewDto {
    // --- Original fields ---

    @MaxLength(1000)
    @ApiProperty({
        required: true,
        description: "",
    })
    comment: string;

    @IsInt()
    @ApiProperty({
        required: true,
        description: "",
    })
    rating: number;

    @IsUrl()
    @ApiProperty({
        required: true,
        description: "",
    })
    image: string;

    // --- Relational fields ---
}
