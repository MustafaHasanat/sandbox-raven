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
import { CreateItemDto } from "src/dto/items/create-item.dto";
import { UpdateItemDto } from "src/dto/items/update-item.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Item } from "src/entities";

@Injectable()
export class ItemsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) {}

    // --- Basic CRUD APIs ---

    async getItems(
        query: FindManyOptions
    ): Promise<CustomResponseType<Item[]>> {
        return await getAllHandler<Item>({
            query,
            repository: this.itemRepository,
            table: "Items",
        });
    }

    async getItemById(id: string): Promise<CustomResponseType<Item>> {
        return await getByIdHandler<Item>({
            id,
            repository: this.itemRepository,
            table: "Item",
        });
    }

    async createItem(
        createItemDto: CreateItemDto
    ): Promise<CustomResponseType<Item>> {
        try {
            const response = await createHandler<Item>({
                dto: createItemDto,
                repository: this.itemRepository,
            });

            return newInstanceRes<Item>(
                "Item has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateItem(
        id: string,
        updateItemDto: UpdateItemDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Item>({
                id,
                dto: updateItemDto,
                table: "Item",
                repository: this.itemRepository,
            });

            return updatedRes<UpdateResult>(
                "Item has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteItem(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Item>({
            id,
            wipe,
            repository: this.itemRepository,
            table: "Item",
            userTokenData,
        });
    }
}
