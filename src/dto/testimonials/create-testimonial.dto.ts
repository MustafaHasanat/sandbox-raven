import { ApiProperty } from "@nestjs/swagger";
import { BusinessStatus } from "src/enums/businessStatus.enum";
import { MaxLength, IsEnum } from "class-validator";

export class CreateTestimonialDto {
    // --- Original fields ---

    @MaxLength(25)
    @ApiProperty({
        required: true,
        description: "",
    })
    content: string;

    @IsEnum(BusinessStatus)
    @ApiProperty({
        required: false,
        description: "",
        // default: BusinessStatus.DEFAULT_VALUE,
        // example: BusinessStatus.INITIAL_VALUE,
        enum: BusinessStatus,
    })
    status?: BusinessStatus;

    // --- Relational fields ---
}
