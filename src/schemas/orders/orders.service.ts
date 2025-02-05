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
import { CreateOrderDto } from "src/dto/orders/create-order.dto";
import { UpdateOrderDto } from "src/dto/orders/update-order.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Order } from "src/entities";

@Injectable()
export class OrdersService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    // --- Basic CRUD APIs ---

    async getOrders(
        query: FindManyOptions
    ): Promise<CustomResponseType<Order[]>> {
        return await getAllHandler<Order>({
            query,
            repository: this.orderRepository,
            table: "Orders",
        });
    }

    async getOrderById(id: string): Promise<CustomResponseType<Order>> {
        return await getByIdHandler<Order>({
            id,
            repository: this.orderRepository,
            table: "Order",
        });
    }

    async createOrder(
        createOrderDto: CreateOrderDto
    ): Promise<CustomResponseType<Order>> {
        try {
            const response = await createHandler<Order>({
                dto: createOrderDto,
                repository: this.orderRepository,
            });

            return newInstanceRes<Order>(
                "Order has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateOrder(
        id: string,
        updateOrderDto: UpdateOrderDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Order>({
                id,
                dto: updateOrderDto,
                table: "Order",
                repository: this.orderRepository,
            });

            return updatedRes<UpdateResult>(
                "Order has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteOrder(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Order>({
            id,
            wipe,
            repository: this.orderRepository,
            table: "Order",
            userTokenData,
        });
    }
}
