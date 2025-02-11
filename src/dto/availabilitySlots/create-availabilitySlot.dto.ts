import { ApiProperty } from "@nestjs/swagger";
import { Day } from "src/enums/day.enum";
import { IsEnum, IsDate } from "class-validator";

export class CreateAvailabilitySlotDto {
    // --- Original fields ---

    @IsEnum(Day)
    @ApiProperty({
        required: true,
        description: "",
        // default: Day.DEFAULT_VALUE,
        // example: Day.INITIAL_VALUE,
        enum: Day,
    })
    day: Day;

    @IsDate()
    @ApiProperty({
        required: true,
        description: "",
    })
    startTime: Date;

    @IsDate()
    @ApiProperty({
        required: true,
        description: "",
    })
    endTime: Date;

    // --- Relational fields ---

    @ApiProperty({
        required: true,
        description: "enter the related business ID",
    })
    business: string;
}
