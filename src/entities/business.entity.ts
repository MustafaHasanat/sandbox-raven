import { TeamMember } from "./teamMember.entity";
import { AvailabilitySlot } from "./availabilitySlot.entity";
import { OrderItem } from "./orderItem.entity";
import { Order } from "./order.entity";
import { Review } from "./review.entity";
import { Coupon } from "./coupon.entity";
import { Discount } from "./discount.entity";
import { Testimonial } from "./testimonial.entity";
import { Collection } from "./collection.entity";
import { Item } from "./item.entity";
import { BusinessTier } from "src/enums/businessTier.enum";
import { BusinessStatus } from "src/enums/businessStatus.enum";
import { WebsiteTheme } from "src/enums/websiteTheme.enum";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
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
    @OneToMany(() => TeamMember, (teamMember) => teamMember.business)
    teamMembers: TeamMember[];

    @OneToMany(
        () => AvailabilitySlot,
        (availabilitySlot) => availabilitySlot.business
    )
    availabilitySlots: AvailabilitySlot[];

    @OneToMany(() => OrderItem, (orderItem) => orderItem.business)
    orderItems: OrderItem[];

    @OneToMany(() => Order, (order) => order.business)
    orders: Order[];

    @OneToMany(() => Review, (review) => review.business)
    reviews: Review[];

    @OneToMany(() => Coupon, (coupon) => coupon.business)
    coupons: Coupon[];

    @OneToMany(() => Discount, (discount) => discount.business)
    discounts: Discount[];

    @OneToMany(() => Testimonial, (testimonial) => testimonial.business)
    testimonials: Testimonial[];

    @OneToMany(() => Collection, (collection) => collection.business)
    collections: Collection[];

    @OneToMany(() => Item, (item) => item.business)
    items: Item[];
}
