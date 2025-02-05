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
import { OrderItemsService } from "./orderItems.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { OrderItemFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { OrderItem } from "src/entities/orderItem.entity";
import { CreateOrderItemDto } from "src/dto/orderItems/create-orderItem.dto";
import { UpdateOrderItemDto } from "src/dto/orderItems/update-orderItem.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("orderItem")
export class OrderItemsController {
    constructor(private readonly orderItemsService: OrderItemsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: OrderItemFields,
        descendants: RELATIONS_OBJECT.orderItem.descendants,
    })
    async getOrderItems(
        @Query(
            new GET_Pipe(OrderItemFields, RELATIONS_OBJECT.orderItem.ascendants)
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<OrderItem[]> =
            await this.orderItemsService.getOrderItems(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single orderItem using its ID" })
    async getOrderItemById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<OrderItem> =
            await this.orderItemsService.getOrderItemById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateOrderItemDto, "create a new orderItem")
    async createOrderItem(
        @Body(new POST_PATCH_Pipe(TablesNames.ORDER_ITEM))
        createOrderItemDto: CreateOrderItemDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<OrderItem> =
            await this.orderItemsService.createOrderItem(createOrderItemDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateOrderItemDto, "update a orderItem")
    async updateOrderItem(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.ORDER_ITEM))
        updateOrderItemDto: UpdateOrderItemDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.orderItemsService.updateOrderItem(
                id,
                updateOrderItemDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete orderItems")
    async deleteOrderItem(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.orderItemsService.deleteOrderItem(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
