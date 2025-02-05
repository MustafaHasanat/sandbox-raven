import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsUUID, MaxLength, IsDecimal, IsUrl, IsInt } from "class-validator";

@Entity()
export class Item {
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
    })
    name: string;

    @IsDecimal()
    @Column({
        type: "int",
        nullable: false,
    })
    price: number;

    @MaxLength(1000)
    @Column({
        type: "text",
        nullable: false,
    })
    description: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: false,
    })
    image: string;

    @IsInt()
    @Column({
        type: "int",
        nullable: false,
    })
    quantity: number;

    // --- relations ---
}
