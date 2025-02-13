import { Business } from "./business.entity";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { MaxLength, IsUrl, IsUUID } from "class-validator";

@Entity()
export class TeamMember {
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
    name: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    image: string;

    @MaxLength(1000)
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    brief: string;

    @MaxLength(50)
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    role: string;

    // --- relations ---
    @ManyToOne(() => Business, (business) => business.teamMembers)
    business: Business;
}
