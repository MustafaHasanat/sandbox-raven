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
import { PermissionsService } from "./permissions.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { PermissionFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Permission } from "src/entities/permission.entity";
import { CreatePermissionDto } from "src/dto/permissions/create-permission.dto";
import { UpdatePermissionDto } from "src/dto/permissions/update-permission.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("permission")
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: PermissionFields,
        descendants: RELATIONS_OBJECT.permission.descendants,
    })
    async getPermissions(
        @Query(
            new GET_Pipe(
                PermissionFields,
                RELATIONS_OBJECT.permission.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Permission[]> =
            await this.permissionsService.getPermissions(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single permission using its ID" })
    async getPermissionById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Permission> =
            await this.permissionsService.getPermissionById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreatePermissionDto, "create a new permission")
    async createPermission(
        @Body(new POST_PATCH_Pipe(TablesNames.PERMISSION))
        createPermissionDto: CreatePermissionDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Permission> =
            await this.permissionsService.createPermission(createPermissionDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdatePermissionDto, "update a permission")
    async updatePermission(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.PERMISSION))
        updatePermissionDto: UpdatePermissionDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.permissionsService.updatePermission(
                id,
                updatePermissionDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete permissions")
    async deletePermission(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.permissionsService.deletePermission(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
