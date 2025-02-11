import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateReviewDto } from "./create-review.dto";
import { IsOptional } from "class-validator";

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    comment?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    rating?: number;

    @IsOptional()
    @ApiProperty({ required: false })
    image?: string;

    // --- Relational fields ---

    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related item ID",
    })
    item?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related business ID",
    })
    business?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related user ID",
    })
    user?: string;
}
