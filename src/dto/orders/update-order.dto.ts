import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import { OrderStatus } from "src/enums/orderStatus.enum";
import { IsOptional } from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    status?: OrderStatus;

    @IsOptional()
    @ApiProperty({ required: false })
    totalPrice?: number;

    // --- Relational fields ---

    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related coupon ID",
    })
    coupon?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related business ID",
    })
    business?: string;
    @ApiProperty({
        required: false,
        default: "",
        description: "enter the related user ID",
    })
    user?: string;
}
