import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTestimonialDto } from "./create-testimonial.dto";
import * as cv from "class-validator";

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
