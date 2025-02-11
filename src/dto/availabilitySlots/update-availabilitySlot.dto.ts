import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateAvailabilitySlotDto } from "./create-availabilitySlot.dto";
import { Day } from "src/enums/day.enum";
import { IsOptional } from "class-validator";

export class UpdateAvailabilitySlotDto extends PartialType(
    CreateAvailabilitySlotDto
) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    day?: Day;

    @IsOptional()
    @ApiProperty({ required: false })
    startTime?: Date;

    @IsOptional()
    @ApiProperty({ required: false })
    endTime?: Date;

    // --- Relational fields ---
}
