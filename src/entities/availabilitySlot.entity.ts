import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Day } from "src/enums/day.enum";
import { IsUUID, IsEnum, IsDate } from "class-validator";

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
}
