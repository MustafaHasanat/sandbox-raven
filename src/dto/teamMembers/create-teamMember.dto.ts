import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsUrl } from "class-validator";

export class CreateTeamMemberDto {
    // --- Original fields ---

    @MaxLength(25)
    @ApiProperty({
        required: true,
        description: "",
    })
    name: string;

    @IsUrl()
    @ApiProperty({
        required: true,
        description: "",
    })
    image: string;

    @MaxLength(1000)
    @ApiProperty({
        required: true,
        description: "",
    })
    brief: string;

    @MaxLength(50)
    @ApiProperty({
        required: true,
        description: "",
    })
    role: string;

    // --- Relational fields ---
}
