import { UserRole } from "../enums/users.enum";
import { Business } from "./business.entity";
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
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm";
import {
    MaxLength,
    IsUUID,
    IsEmail,
    IsEnum,
    Matches,
    Length,
} from "class-validator";

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

        default: "123",
    })
    firstName: string;

    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
        comment: "",

        default: "test",
    })
    lastName: string;

    // --- relations ---

    @ManyToMany(() => Business, (business) => business.users)
    @JoinTable()
    businesses: Business[];

    @OneToMany(() => OrderItem, (orderItem) => orderItem.user)
    orderItems: OrderItem[];

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @OneToMany(() => Testimonial, (testimonial) => testimonial.user)
    testimonials: Testimonial[];
}
