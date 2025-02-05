import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCaramelDto } from "./create-caramel.dto";
import * as cv from "class-validator";

export class UpdateCaramelDto extends PartialType(CreateCaramelDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
