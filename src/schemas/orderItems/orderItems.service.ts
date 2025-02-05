import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    DeleteResult,
    FindManyOptions,
    Repository,
    UpdateResult,
} from "typeorm";
import {
    CustomResponseType,
    DeleteQueryProps,
    FullTokenPayload,
} from "src/types";
import { errorRes, newInstanceRes, updatedRes } from "src/responses";
import { CreateOrderItemDto } from "src/dto/orderItems/create-orderItem.dto";
import { UpdateOrderItemDto } from "src/dto/orderItems/update-orderItem.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { OrderItem } from "src/entities";

@Injectable()
export class OrderItemsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>
    ) {}

    // --- Basic CRUD APIs ---

    async getOrderItems(
        query: FindManyOptions
    ): Promise<CustomResponseType<OrderItem[]>> {
        return await getAllHandler<OrderItem>({
            query,
            repository: this.orderItemRepository,
            table: "OrderItems",
        });
    }

    async getOrderItemById(id: string): Promise<CustomResponseType<OrderItem>> {
        return await getByIdHandler<OrderItem>({
            id,
            repository: this.orderItemRepository,
            table: "OrderItem",
        });
    }

    async createOrderItem(
        createOrderItemDto: CreateOrderItemDto
    ): Promise<CustomResponseType<OrderItem>> {
        try {
            const response = await createHandler<OrderItem>({
                dto: createOrderItemDto,
                repository: this.orderItemRepository,
            });

            return newInstanceRes<OrderItem>(
                "OrderItem has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateOrderItem(
        id: string,
        updateOrderItemDto: UpdateOrderItemDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<OrderItem>({
                id,
                dto: updateOrderItemDto,
                table: "OrderItem",
                repository: this.orderItemRepository,
            });

            return updatedRes<UpdateResult>(
                "OrderItem has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteOrderItem(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<OrderItem>({
            id,
            wipe,
            repository: this.orderItemRepository,
            table: "OrderItem",
            userTokenData,
        });
    }
}
