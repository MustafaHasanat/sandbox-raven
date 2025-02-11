import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTeamMemberDto } from "./create-teamMember.dto";
import { IsOptional } from "class-validator";

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    image?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    brief?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    role?: string;

    // --- Relational fields ---
}
