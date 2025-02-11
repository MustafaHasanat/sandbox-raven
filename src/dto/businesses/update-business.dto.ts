import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBusinessDto } from "./create-business.dto";
import { BusinessTier } from "src/enums/businessTier.enum";
import { BusinessStatus } from "src/enums/businessStatus.enum";
import { WebsiteTheme } from "src/enums/websiteTheme.enum";
import { IsOptional } from "class-validator";

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    subdomain?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    location?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    slogan?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    brief?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    logo?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    tier?: BusinessTier;

    @IsOptional()
    @ApiProperty({ required: false })
    status?: BusinessStatus;

    @IsOptional()
    @ApiProperty({ required: false })
    theme?: WebsiteTheme;

    @IsOptional()
    @ApiProperty({ required: false })
    wifiPass?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    phoneNumber?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    publicPhone?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    instagram?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    facebook?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    whatsapp?: string;

    // --- Relational fields ---
}
