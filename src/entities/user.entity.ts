import { IsEmail, IsEnum, IsUUID, Length, Matches } from "class-validator";
import { UserRole } from "../enums/users.enum";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "./orderItem.entity";
import { Order } from "./order.entity";
import { Review } from "./review.entity";
import { Testimonial } from "./testimonial.entity";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { IsUUID, MaxLength, IsUrl } from "class-validator";

@Entity()
export class User {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @Length(3, 25)
    @Column({
        nullable: false,
        unique: true,
    })
    username: string;

    @IsEmail()
    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Length(8, 25)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    @Column({
        nullable: false,
    })
    password: string;

    @IsEnum(UserRole)
    @Column({
        type: "enum",
        enum: UserRole,
        nullable: true,
        default: UserRole.CUSTOMER,
    })
    role: UserRole;

    @Column({
        nullable: true,
        default: "",
    })
    token?: string;

    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    firstName: string;

    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    lastName: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    avatar?: string;

    // --- relations ---

    @OneToMany(() => OrderItem, (orderItem) => orderItem.user)
    orderItems: OrderItem[];

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @OneToMany(() => Testimonial, (testimonial) => testimonial.user)
    testimonials: Testimonial[];
}
