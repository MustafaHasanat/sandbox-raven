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
import { CaramelsService } from "./caramels.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { CaramelFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Caramel } from "src/entities/caramel.entity";
import { CreateCaramelDto } from "src/dto/caramels/create-caramel.dto";
import { UpdateCaramelDto } from "src/dto/caramels/update-caramel.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("caramel")
export class CaramelsController {
    constructor(private readonly caramelsService: CaramelsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: CaramelFields,
        descendants: RELATIONS_OBJECT.caramel.descendants,
    })
    async getCaramels(
        @Query(new GET_Pipe(CaramelFields, RELATIONS_OBJECT.caramel.ascendants))
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Caramel[]> =
            await this.caramelsService.getCaramels(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single caramel using its ID" })
    async getCaramelById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Caramel> =
            await this.caramelsService.getCaramelById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateCaramelDto, "create a new caramel")
    async createCaramel(
        @Body(new POST_PATCH_Pipe(TablesNames.CARAMEL))
        createCaramelDto: CreateCaramelDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Caramel> =
            await this.caramelsService.createCaramel(createCaramelDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateCaramelDto, "update a caramel")
    async updateCaramel(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.CARAMEL))
        updateCaramelDto: UpdateCaramelDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.caramelsService.updateCaramel(id, updateCaramelDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete caramels")
    async deleteCaramel(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.caramelsService.deleteCaramel(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
