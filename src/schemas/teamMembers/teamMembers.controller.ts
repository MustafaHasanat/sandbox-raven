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
import { TeamMembersService } from "./teamMembers.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { TeamMemberFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { TeamMember } from "src/entities/teamMember.entity";
import { CreateTeamMemberDto } from "src/dto/teamMembers/create-teamMember.dto";
import { UpdateTeamMemberDto } from "src/dto/teamMembers/update-teamMember.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("teamMember")
export class TeamMembersController {
    constructor(private readonly teamMembersService: TeamMembersService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: TeamMemberFields,
        descendants: RELATIONS_OBJECT.teamMember.descendants,
    })
    async getTeamMembers(
        @Query(
            new GET_Pipe(
                TeamMemberFields,
                RELATIONS_OBJECT.teamMember.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<TeamMember[]> =
            await this.teamMembersService.getTeamMembers(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single teamMember using its ID" })
    async getTeamMemberById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<TeamMember> =
            await this.teamMembersService.getTeamMemberById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateTeamMemberDto, "create a new teamMember")
    async createTeamMember(
        @Body(new POST_PATCH_Pipe(TablesNames.TEAM_MEMBER))
        createTeamMemberDto: CreateTeamMemberDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<TeamMember> =
            await this.teamMembersService.createTeamMember(createTeamMemberDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateTeamMemberDto, "update a teamMember")
    async updateTeamMember(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.TEAM_MEMBER))
        updateTeamMemberDto: UpdateTeamMemberDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.teamMembersService.updateTeamMember(
                id,
                updateTeamMemberDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete teamMembers")
    async deleteTeamMember(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.teamMembersService.deleteTeamMember(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
