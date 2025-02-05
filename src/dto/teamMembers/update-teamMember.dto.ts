import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTeamMemberDto } from "./create-teamMember.dto";
import * as cv from "class-validator";

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
