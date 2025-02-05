import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { BusinessTier } from "src/enums/businessTier.enum";
import { BusinessStatus } from "src/enums/businessStatus.enum";
import { WebsiteTheme } from "src/enums/websiteTheme.enum";
import {
    IsUUID,
    MaxLength,
    IsLatLong,
    IsUrl,
    IsEnum,
    IsPhoneNumber,
} from "class-validator";

@Entity()
export class Business {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @MaxLength(50)
    @Column({
        type: "text",
        nullable: false,
    })
    name: string;

    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
        unique: true,
    })
    subdomain: string;

    @IsLatLong()
    @Column({
        type: "text",
        nullable: false,
    })
    location: string;

    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
    })
    slogan?: string;

    @MaxLength(500)
    @Column({
        type: "text",
        nullable: true,
    })
    brief?: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: false,
    })
    logo: string;

    @IsEnum(BusinessTier)
    @Column({
        type: "enum",
        nullable: true,

        enum: BusinessTier,

        // default: BusinessTier.DEFAULT_VALUE,
    })
    tier?: BusinessTier;

    @IsEnum(BusinessStatus)
    @Column({
        type: "enum",
        nullable: true,

        enum: BusinessStatus,

        // default: BusinessStatus.DEFAULT_VALUE,
    })
    status?: BusinessStatus;

    @IsEnum(WebsiteTheme)
    @Column({
        type: "enum",
        nullable: true,

        enum: WebsiteTheme,

        // default: WebsiteTheme.DEFAULT_VALUE,
    })
    theme?: WebsiteTheme;

    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
    })
    wifiPass?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
    })
    phoneNumber?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
    })
    publicPhone?: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: true,
    })
    instagram?: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: true,
    })
    facebook?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
    })
    whatsapp?: string;

    // --- relations ---
}
