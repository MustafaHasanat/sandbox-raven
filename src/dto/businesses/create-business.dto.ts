import { ApiProperty } from "@nestjs/swagger";
import { BusinessTier } from "src/enums/businessTier.enum";
import { BusinessStatus } from "src/enums/businessStatus.enum";
import { WebsiteTheme } from "src/enums/websiteTheme.enum";
import {
    MaxLength,
    IsLatLong,
    IsUrl,
    IsEnum,
    IsPhoneNumber,
} from "class-validator";

export class CreateBusinessDto {
    // --- Original fields ---

    @MaxLength(50)
    @ApiProperty({
        required: true,
        description: "",
    })
    name: string;

    @MaxLength(25)
    @ApiProperty({
        required: true,
        description: "",
    })
    subdomain: string;

    @IsLatLong()
    @ApiProperty({
        required: true,
        description: "",
    })
    location: string;

    @MaxLength(100)
    @ApiProperty({
        required: false,
        description: "",
    })
    slogan?: string;

    @MaxLength(500)
    @ApiProperty({
        required: false,
        description: "",
    })
    brief?: string;

    @IsUrl()
    @ApiProperty({
        required: true,
        description: "",
    })
    logo: string;

    @IsEnum(BusinessTier)
    @ApiProperty({
        required: false,
        description: "",
        // default: BusinessTier.DEFAULT_VALUE,
        // example: BusinessTier.INITIAL_VALUE,
        enum: BusinessTier,
    })
    tier?: BusinessTier;

    @IsEnum(BusinessStatus)
    @ApiProperty({
        required: false,
        description: "",
        // default: BusinessStatus.DEFAULT_VALUE,
        // example: BusinessStatus.INITIAL_VALUE,
        enum: BusinessStatus,
    })
    status?: BusinessStatus;

    @IsEnum(WebsiteTheme)
    @ApiProperty({
        required: false,
        description: "",
        // default: WebsiteTheme.DEFAULT_VALUE,
        // example: WebsiteTheme.INITIAL_VALUE,
        enum: WebsiteTheme,
    })
    theme?: WebsiteTheme;

    @MaxLength(100)
    @ApiProperty({
        required: false,
        description: "",
    })
    wifiPass?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @ApiProperty({
        required: false,
        description: "",
    })
    phoneNumber?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @ApiProperty({
        required: false,
        description: "",
    })
    publicPhone?: string;

    @IsUrl()
    @ApiProperty({
        required: false,
        description: "",
    })
    instagram?: string;

    @IsUrl()
    @ApiProperty({
        required: false,
        description: "",
    })
    facebook?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @ApiProperty({
        required: false,
        description: "",
    })
    whatsapp?: string;

    // --- Relational fields ---

    @ApiProperty({ required: true, description: "enter the related user ID" })
    user: string;
}
