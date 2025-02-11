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
        comment: "",
    })
    name: string;

    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
        comment: "",

        unique: true,
    })
    subdomain: string;

    @IsLatLong()
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    location: string;

    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    slogan?: string;

    @MaxLength(500)
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    brief?: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    logo: string;

    @IsEnum(BusinessTier)
    @Column({
        type: "enum",
        nullable: true,
        comment: "",
        enum: BusinessTier,

        // default: BusinessTier.DEFAULT_VALUE,
    })
    tier?: BusinessTier;

    @IsEnum(BusinessStatus)
    @Column({
        type: "enum",
        nullable: true,
        comment: "",
        enum: BusinessStatus,

        // default: BusinessStatus.DEFAULT_VALUE,
    })
    status?: BusinessStatus;

    @IsEnum(WebsiteTheme)
    @Column({
        type: "enum",
        nullable: true,
        comment: "",
        enum: WebsiteTheme,

        // default: WebsiteTheme.DEFAULT_VALUE,
    })
    theme?: WebsiteTheme;

    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    wifiPass?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    phoneNumber?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    publicPhone?: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    instagram?: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    facebook?: string;

    @IsPhoneNumber()
    @MaxLength(100)
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    whatsapp?: string;

    // --- relations ---
}
