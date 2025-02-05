import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBusinessDto } from "./create-business.dto";
import * as cv from "class-validator";

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
