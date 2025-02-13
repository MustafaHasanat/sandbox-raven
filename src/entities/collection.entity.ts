import { Item } from "./item.entity";
import { Business } from "./business.entity";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { MaxLength, IsUUID } from "class-validator";

@Entity()
export class Collection {
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

    // --- relations ---
    @OneToMany(() => Item, (item) => item.collection)
    items: Item[];

    @ManyToOne(() => Business, (business) => business.collections)
    business: Business;
}
