import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "src/enums/orderStatus.enum";
import { IsEnum, IsDecimal } from "class-validator";

export class CreateOrderDto {
    // --- Original fields ---

    @IsEnum(OrderStatus)
    @ApiProperty({
        required: false,
        description: "",
        // default: OrderStatus.DEFAULT_VALUE,
        // example: OrderStatus.INITIAL_VALUE,
        enum: OrderStatus,
    })
    status?: OrderStatus;

    @IsDecimal()
    @ApiProperty({
        required: true,
        description: "",
    })
    totalPrice: number;

    // --- Relational fields ---

    @ApiProperty({ required: true, description: "enter the related coupon ID" })
    coupon: string;
    @ApiProperty({
        required: true,
        description: "enter the related business ID",
    })
    business: string;
    @ApiProperty({ required: true, description: "enter the related user ID" })
    user: string;
}
