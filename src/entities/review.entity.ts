import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsUUID, MaxLength, IsInt, IsUrl } from "class-validator";

@Entity()
export class Review {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @MaxLength(1000)
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    comment: string;

    @IsInt()
    @Column({
        type: "int",
        nullable: false,
        comment: "",
    })
    rating: number;

    @IsUrl()
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    image: string;

    // --- relations ---
}
