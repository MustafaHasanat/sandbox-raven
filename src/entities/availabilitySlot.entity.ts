import { Business } from "./business.entity";
import { Day } from "src/enums/day.enum";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsEnum, IsDate, IsUUID } from "class-validator";

@Entity()
export class AvailabilitySlot {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @IsEnum(Day)
    @Column({
        type: "enum",
        nullable: false,
        comment: "",
        enum: Day,
        // default: Day.DEFAULT_VALUE,
    })
    day: Day;

    @IsDate()
    @Column({
        type: "date",
        nullable: false,
        comment: "",
    })
    startTime: Date;

    @IsDate()
    @Column({
        type: "date",
        nullable: false,
        comment: "",
    })
    endTime: Date;

    // --- relations ---
    @ManyToOne(() => Business, (business) => business.availabilitySlots)
    business: Business;
}
