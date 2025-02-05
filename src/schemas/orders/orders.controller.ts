import {
    Body,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Res,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { DeleteResult, FindManyOptions, UpdateResult } from "typeorm";
import { Request, Response } from "express";
import { OrdersService } from "./orders.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { OrderFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Order } from "src/entities/order.entity";
import { CreateOrderDto } from "src/dto/orders/create-order.dto";
import { UpdateOrderDto } from "src/dto/orders/update-order.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("order")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: OrderFields,
        descendants: RELATIONS_OBJECT.order.descendants,
    })
    async getOrders(
        @Query(new GET_Pipe(OrderFields, RELATIONS_OBJECT.order.ascendants))
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Order[]> =
            await this.ordersService.getOrders(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single order using its ID" })
    async getOrderById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Order> =
            await this.ordersService.getOrderById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateOrderDto, "create a new order")
    async createOrder(
        @Body(new POST_PATCH_Pipe(TablesNames.ORDER))
        createOrderDto: CreateOrderDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Order> =
            await this.ordersService.createOrder(createOrderDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateOrderDto, "update a order")
    async updateOrder(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.ORDER))
        updateOrderDto: UpdateOrderDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.ordersService.updateOrder(id, updateOrderDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete orders")
    async deleteOrder(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.ordersService.deleteOrder(query, getUserTokenData(req));

        return res.status(response.status).json(response);
    }
}
