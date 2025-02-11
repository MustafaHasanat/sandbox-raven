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
    @ManyToOne(() => Item, (item) => item.reviews)
    item: Item;

    @ManyToOne(() => Business, (business) => business.reviews)
    business: Business;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;
}
