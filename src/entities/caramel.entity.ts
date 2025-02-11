import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsUUID, MaxLength } from "class-validator";

@Entity()
export class Caramel {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @MaxLength(30)
    @Column({
        type: "text",
        nullable: false,
        comment: "",

        unique: true,
    })
    identifier: string;

    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    content: string;

    // --- relations ---
}
