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
import { CouponsService } from "./coupons.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { CouponFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Coupon } from "src/entities/coupon.entity";
import { CreateCouponDto } from "src/dto/coupons/create-coupon.dto";
import { UpdateCouponDto } from "src/dto/coupons/update-coupon.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("coupon")
export class CouponsController {
    constructor(private readonly couponsService: CouponsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: CouponFields,
        descendants: RELATIONS_OBJECT.coupon.descendants,
    })
    async getCoupons(
        @Query(new GET_Pipe(CouponFields, RELATIONS_OBJECT.coupon.ascendants))
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Coupon[]> =
            await this.couponsService.getCoupons(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single coupon using its ID" })
    async getCouponById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Coupon> =
            await this.couponsService.getCouponById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateCouponDto, "create a new coupon")
    async createCoupon(
        @Body(new POST_PATCH_Pipe(TablesNames.COUPON))
        createCouponDto: CreateCouponDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Coupon> =
            await this.couponsService.createCoupon(createCouponDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateCouponDto, "update a coupon")
    async updateCoupon(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.COUPON))
        updateCouponDto: UpdateCouponDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.couponsService.updateCoupon(id, updateCouponDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete coupons")
    async deleteCoupon(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.couponsService.deleteCoupon(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
