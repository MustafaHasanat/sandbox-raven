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
import { ProductsService } from "./products.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "../../common/decorators";
import { CustomResponseType, DeleteQueryProps } from "../../common/types";
import { ProductFields, TablesNames } from "../../common/enums/tables.enum";
import { RELATIONS_OBJECT } from "../../common/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "../../common/pipes";
import { Product } from "../../entities/product.entity";
import { CreateProductDto } from "../../common/dto/products/create-product.dto";
import { UpdateProductDto } from "../../common/dto/products/update-product.dto";
import { DeletionQuery } from "src/common/decorators/delete.decorator";
import { getUserTokenData } from "src/common/helpers";

@ControllerWrapper("product")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: ProductFields,
        descendants: RELATIONS_OBJECT.product.descendants,
    })
    async getProducts(
        @Query(new GET_Pipe(ProductFields, RELATIONS_OBJECT.product.ascendants))
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Product[]> =
            await this.productsService.getProducts(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single product using its ID" })
    async getProductById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Product> =
            await this.productsService.getProductById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateProductDto, "create a new product")
    async createProduct(
        @Body(new POST_PATCH_Pipe(TablesNames.PRODUCT))
        createProductDto: CreateProductDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Product> =
            await this.productsService.createProduct(createProductDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateProductDto, "update a product")
    async updateProduct(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.PRODUCT))
        updateProductDto: UpdateProductDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.productsService.updateProduct(id, updateProductDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete products")
    async deleteProduct(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.productsService.deleteProduct(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
