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
import { DiscountsService } from "./discounts.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { DiscountFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Discount } from "src/entities/discount.entity";
import { CreateDiscountDto } from "src/dto/discounts/create-discount.dto";
import { UpdateDiscountDto } from "src/dto/discounts/update-discount.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("discount")
export class DiscountsController {
    constructor(private readonly discountsService: DiscountsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: DiscountFields,
        descendants: RELATIONS_OBJECT.discount.descendants,
    })
    async getDiscounts(
        @Query(
            new GET_Pipe(DiscountFields, RELATIONS_OBJECT.discount.ascendants)
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Discount[]> =
            await this.discountsService.getDiscounts(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single discount using its ID" })
    async getDiscountById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Discount> =
            await this.discountsService.getDiscountById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateDiscountDto, "create a new discount")
    async createDiscount(
        @Body(new POST_PATCH_Pipe(TablesNames.DISCOUNT))
        createDiscountDto: CreateDiscountDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Discount> =
            await this.discountsService.createDiscount(createDiscountDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateDiscountDto, "update a discount")
    async updateDiscount(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.DISCOUNT))
        updateDiscountDto: UpdateDiscountDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.discountsService.updateDiscount(id, updateDiscountDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete discounts")
    async deleteDiscount(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.discountsService.deleteDiscount(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
