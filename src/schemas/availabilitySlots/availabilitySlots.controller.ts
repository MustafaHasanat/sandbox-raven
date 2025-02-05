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
import { AvailabilitySlotsService } from "./availabilitySlots.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { AvailabilitySlotFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { AvailabilitySlot } from "src/entities/availabilitySlot.entity";
import { CreateAvailabilitySlotDto } from "src/dto/availabilitySlots/create-availabilitySlot.dto";
import { UpdateAvailabilitySlotDto } from "src/dto/availabilitySlots/update-availabilitySlot.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("availabilitySlot")
export class AvailabilitySlotsController {
    constructor(
        private readonly availabilitySlotsService: AvailabilitySlotsService
    ) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: AvailabilitySlotFields,
        descendants: RELATIONS_OBJECT.availabilitySlot.descendants,
    })
    async getAvailabilitySlots(
        @Query(
            new GET_Pipe(
                AvailabilitySlotFields,
                RELATIONS_OBJECT.availabilitySlot.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<AvailabilitySlot[]> =
            await this.availabilitySlotsService.getAvailabilitySlots(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single availabilitySlot using its ID" })
    async getAvailabilitySlotById(
        @Param("id") id: string,
        @Res() res: Response
    ) {
        const response: CustomResponseType<AvailabilitySlot> =
            await this.availabilitySlotsService.getAvailabilitySlotById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateAvailabilitySlotDto, "create a new availabilitySlot")
    async createAvailabilitySlot(
        @Body(new POST_PATCH_Pipe(TablesNames.AVAILABILITY_SLOT))
        createAvailabilitySlotDto: CreateAvailabilitySlotDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<AvailabilitySlot> =
            await this.availabilitySlotsService.createAvailabilitySlot(
                createAvailabilitySlotDto
            );

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateAvailabilitySlotDto, "update a availabilitySlot")
    async updateAvailabilitySlot(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.AVAILABILITY_SLOT))
        updateAvailabilitySlotDto: UpdateAvailabilitySlotDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.availabilitySlotsService.updateAvailabilitySlot(
                id,
                updateAvailabilitySlotDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete availabilitySlots")
    async deleteAvailabilitySlot(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.availabilitySlotsService.deleteAvailabilitySlot(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
