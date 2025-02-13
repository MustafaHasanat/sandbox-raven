import { Business } from "./business.entity";
import { Item } from "./item.entity";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsUUID } from "class-validator";

@Entity()
export class Discount {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @Column({
        type: "int",
        nullable: false,
        comment: "",
    })
    percent: number;

    // --- relations ---
    @ManyToOne(() => Business, (business) => business.discounts)
    business: Business;
}
