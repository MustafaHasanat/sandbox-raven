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
}
