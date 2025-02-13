import { Order } from "./order.entity";
import { Business } from "./business.entity";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { MaxLength, IsDecimal, IsUUID } from "class-validator";

@Entity()
export class Coupon {
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
    code: string;

    @Column({
        type: "int",
        nullable: true,
        comment: "",
    })
    percent?: number;

    @IsDecimal()
    @Column({
        type: "int",
        nullable: true,
        comment: "",
    })
    amount?: number;

    // --- relations ---
    @OneToMany(() => Order, (order) => order.coupon)
    orders: Order[];

    @ManyToOne(() => Business, (business) => business.coupons)
    business: Business;
}
