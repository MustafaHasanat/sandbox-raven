import { Business } from "./business.entity";
import { User } from "./user.entity";
import { BusinessStatus } from "src/enums/businessStatus.enum";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsUUID, MaxLength, IsEnum } from "class-validator";

@Entity()
export class Testimonial {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    content: string;

    @IsEnum(BusinessStatus)
    @Column({
        type: "enum",
        nullable: true,
        comment: "",
        enum: BusinessStatus,
        // default: BusinessStatus.DEFAULT_VALUE,
    })
    status?: BusinessStatus;

    // --- relations ---
    @ManyToOne(() => Business, (business) => business.testimonials)
    business: Business;

    @ManyToOne(() => User, (user) => user.testimonials)
    user: User;
}
