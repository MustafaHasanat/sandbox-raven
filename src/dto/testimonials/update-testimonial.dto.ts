import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTestimonialDto } from "./create-testimonial.dto";
import { BusinessStatus } from "src/enums/businessStatus.enum";
import { IsOptional } from "class-validator";

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    content?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    status?: BusinessStatus;

    // --- Relational fields ---

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
