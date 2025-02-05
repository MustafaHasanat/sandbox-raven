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
import { BusinessesService } from "./businesses.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { BusinessFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Business } from "src/entities/business.entity";
import { CreateBusinessDto } from "src/dto/businesses/create-business.dto";
import { UpdateBusinessDto } from "src/dto/businesses/update-business.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("business")
export class BusinessesController {
    constructor(private readonly businessesService: BusinessesService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: BusinessFields,
        descendants: RELATIONS_OBJECT.business.descendants,
    })
    async getBusinesses(
        @Query(
            new GET_Pipe(BusinessFields, RELATIONS_OBJECT.business.ascendants)
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Business[]> =
            await this.businessesService.getBusinesses(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single business using its ID" })
    async getBusinessById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Business> =
            await this.businessesService.getBusinessById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateBusinessDto, "create a new business")
    async createBusiness(
        @Body(new POST_PATCH_Pipe(TablesNames.BUSINESS))
        createBusinessDto: CreateBusinessDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Business> =
            await this.businessesService.createBusiness(createBusinessDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateBusinessDto, "update a business")
    async updateBusiness(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.BUSINESS))
        updateBusinessDto: UpdateBusinessDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.businessesService.updateBusiness(id, updateBusinessDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete businesses")
    async deleteBusiness(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.businessesService.deleteBusiness(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
