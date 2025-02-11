import { OrderItem } from "./orderItem.entity";
import { Review } from "./review.entity";
import { Collection } from "./collection.entity";
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
        comment: "",
    })
    name: string;

    @IsDecimal()
    @Column({
        type: "int",
        nullable: false,
        comment: "",
    })
    price: number;

    @MaxLength(1000)
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    description: string;

    @IsUrl()
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    image: string;

    @IsInt()
    @Column({
        type: "int",
        nullable: false,
        comment: "",
    })
    quantity: number;

    // --- relations ---
    @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
    orderItems: OrderItem[];

    @OneToMany(() => Review, (review) => review.item)
    reviews: Review[];

    @ManyToOne(() => Collection, (collection) => collection.items)
    collection: Collection;

    @ManyToOne(() => Business, (business) => business.items)
    business: Business;
}
