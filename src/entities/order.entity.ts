import { OrderItem } from "./orderItem.entity";
import { Coupon } from "./coupon.entity";
import { Business } from "./business.entity";
import { User } from "./user.entity";
import { OrderStatus } from "src/enums/orderStatus.enum";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { IsEnum, IsDecimal, IsUUID } from "class-validator";

@Entity()
export class Order {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @IsEnum(OrderStatus)
    @Column({
        type: "enum",
        nullable: true,
        comment: "",
        enum: OrderStatus,
        // default: OrderStatus.DEFAULT_VALUE,
    })
    status?: OrderStatus;

    @IsDecimal()
    @Column({
        type: "int",
        nullable: false,
        comment: "",
    })
    totalPrice: number;

    // --- relations ---
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[];

    @ManyToOne(() => Coupon, (coupon) => coupon.orders)
    coupon: Coupon;

    @ManyToOne(() => Business, (business) => business.orders)
    business: Business;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}
