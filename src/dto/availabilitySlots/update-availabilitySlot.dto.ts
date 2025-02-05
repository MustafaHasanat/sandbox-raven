import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateAvailabilitySlotDto } from "./create-availabilitySlot.dto";
import * as cv from "class-validator";

export class UpdateAvailabilitySlotDto extends PartialType(
    CreateAvailabilitySlotDto
) {
    // --- Original fields ---
    // --- Relational fields ---
}
