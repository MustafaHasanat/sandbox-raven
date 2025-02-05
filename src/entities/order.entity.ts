import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { OrderStatus } from "src/enums/orderStatus.enum";
import { IsUUID, IsEnum, IsDecimal } from "class-validator";

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

        enum: OrderStatus,

        // default: OrderStatus.DEFAULT_VALUE,
    })
    status?: OrderStatus;

    @IsDecimal()
    @Column({
        type: "int",
        nullable: false,
    })
    totalPrice: number;

    // --- relations ---
}
