import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsUUID, IsInt } from "class-validator";

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
    })
    quantity: number;

    // --- relations ---
}
