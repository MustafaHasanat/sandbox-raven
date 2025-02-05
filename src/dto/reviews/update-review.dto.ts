import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateReviewDto } from "./create-review.dto";
import * as cv from "class-validator";

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
