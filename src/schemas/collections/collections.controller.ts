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
import { CollectionsService } from "./collections.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { CollectionFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Collection } from "src/entities/collection.entity";
import { CreateCollectionDto } from "src/dto/collections/create-collection.dto";
import { UpdateCollectionDto } from "src/dto/collections/update-collection.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("collection")
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: CollectionFields,
        descendants: RELATIONS_OBJECT.collection.descendants,
    })
    async getCollections(
        @Query(
            new GET_Pipe(
                CollectionFields,
                RELATIONS_OBJECT.collection.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Collection[]> =
            await this.collectionsService.getCollections(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single collection using its ID" })
    async getCollectionById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Collection> =
            await this.collectionsService.getCollectionById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateCollectionDto, "create a new collection")
    async createCollection(
        @Body(new POST_PATCH_Pipe(TablesNames.COLLECTION))
        createCollectionDto: CreateCollectionDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Collection> =
            await this.collectionsService.createCollection(createCollectionDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateCollectionDto, "update a collection")
    async updateCollection(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.COLLECTION))
        updateCollectionDto: UpdateCollectionDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.collectionsService.updateCollection(
                id,
                updateCollectionDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete collections")
    async deleteCollection(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.collectionsService.deleteCollection(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
