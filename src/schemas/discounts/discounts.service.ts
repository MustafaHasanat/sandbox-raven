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
import { CreateDiscountDto } from "src/dto/discounts/create-discount.dto";
import { UpdateDiscountDto } from "src/dto/discounts/update-discount.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Discount } from "src/entities";

@Injectable()
export class DiscountsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Discount)
        private readonly discountRepository: Repository<Discount>
    ) {}

    // --- Basic CRUD APIs ---

    async getDiscounts(
        query: FindManyOptions
    ): Promise<CustomResponseType<Discount[]>> {
        return await getAllHandler<Discount>({
            query,
            repository: this.discountRepository,
            table: "Discounts",
        });
    }

    async getDiscountById(id: string): Promise<CustomResponseType<Discount>> {
        return await getByIdHandler<Discount>({
            id,
            repository: this.discountRepository,
            table: "Discount",
        });
    }

    async createDiscount(
        createDiscountDto: CreateDiscountDto
    ): Promise<CustomResponseType<Discount>> {
        try {
            const response = await createHandler<Discount>({
                dto: createDiscountDto,
                repository: this.discountRepository,
            });

            return newInstanceRes<Discount>(
                "Discount has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateDiscount(
        id: string,
        updateDiscountDto: UpdateDiscountDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Discount>({
                id,
                dto: updateDiscountDto,
                table: "Discount",
                repository: this.discountRepository,
            });

            return updatedRes<UpdateResult>(
                "Discount has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteDiscount(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Discount>({
            id,
            wipe,
            repository: this.discountRepository,
            table: "Discount",
            userTokenData,
        });
    }
}
