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
} from "../../common/types";
import { errorRes, newInstanceRes, updatedRes } from "../../common/responses";
import { CreateProductDto } from "../../common/dto/products/create-product.dto";
import { UpdateProductDto } from "../../common/dto/products/update-product.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "../../common/helpers";
import { Product } from "../../entities";

@Injectable()
export class ProductsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    // --- Basic CRUD APIs ---

    async getProducts(
        query: FindManyOptions
    ): Promise<CustomResponseType<Product[]>> {
        return await getAllHandler<Product>({
            query,
            repository: this.productRepository,
            table: "Products",
        });
    }

    async getProductById(id: string): Promise<CustomResponseType<Product>> {
        return await getByIdHandler<Product>({
            id,
            repository: this.productRepository,
            table: "Product",
        });
    }

    async createProduct(
        createProductDto: CreateProductDto
    ): Promise<CustomResponseType<Product>> {
        try {
            const response = await createHandler<Product>({
                dto: createProductDto,
                repository: this.productRepository,
            });

            return newInstanceRes<Product>(
                "Product has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateProduct(
        id: string,
        updateProductDto: UpdateProductDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Product>({
                id,
                dto: updateProductDto,
                table: "Product",
                repository: this.productRepository,
            });

            return updatedRes<UpdateResult>(
                "Product has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteProduct(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Product>({
            id,
            wipe,
            repository: this.productRepository,
            table: "Product",
            userTokenData,
        });
    }
}
