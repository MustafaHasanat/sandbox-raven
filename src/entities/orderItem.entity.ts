import { Order } from "./order.entity";
import { Item } from "./item.entity";
import { Business } from "./business.entity";
import { User } from "./user.entity";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsInt, IsUUID } from "class-validator";

@Entity()
export class OrderItem {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @IsInt()
    @Column({
        type: "int",
        nullable: false,
        comment: "",
    })
    quantity: number;

    // --- relations ---
    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;

    @ManyToOne(() => Item, (item) => item.orderItems)
    item: Item;

    @ManyToOne(() => Business, (business) => business.orderItems)
    business: Business;

    @ManyToOne(() => User, (user) => user.orderItems)
    user: User;
}
