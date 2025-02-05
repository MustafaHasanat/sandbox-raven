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
import { CreateTeamMemberDto } from "src/dto/teamMembers/create-teamMember.dto";
import { UpdateTeamMemberDto } from "src/dto/teamMembers/update-teamMember.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { TeamMember } from "src/entities";

@Injectable()
export class TeamMembersService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(TeamMember)
        private readonly teamMemberRepository: Repository<TeamMember>
    ) {}

    // --- Basic CRUD APIs ---

    async getTeamMembers(
        query: FindManyOptions
    ): Promise<CustomResponseType<TeamMember[]>> {
        return await getAllHandler<TeamMember>({
            query,
            repository: this.teamMemberRepository,
            table: "TeamMembers",
        });
    }

    async getTeamMemberById(
        id: string
    ): Promise<CustomResponseType<TeamMember>> {
        return await getByIdHandler<TeamMember>({
            id,
            repository: this.teamMemberRepository,
            table: "TeamMember",
        });
    }

    async createTeamMember(
        createTeamMemberDto: CreateTeamMemberDto
    ): Promise<CustomResponseType<TeamMember>> {
        try {
            const response = await createHandler<TeamMember>({
                dto: createTeamMemberDto,
                repository: this.teamMemberRepository,
            });

            return newInstanceRes<TeamMember>(
                "TeamMember has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateTeamMember(
        id: string,
        updateTeamMemberDto: UpdateTeamMemberDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<TeamMember>({
                id,
                dto: updateTeamMemberDto,
                table: "TeamMember",
                repository: this.teamMemberRepository,
            });

            return updatedRes<UpdateResult>(
                "TeamMember has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteTeamMember(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<TeamMember>({
            id,
            wipe,
            repository: this.teamMemberRepository,
            table: "TeamMember",
            userTokenData,
        });
    }
}
