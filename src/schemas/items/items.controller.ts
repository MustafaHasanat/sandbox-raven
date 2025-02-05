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
import { ItemsService } from "./items.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { ItemFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Item } from "src/entities/item.entity";
import { CreateItemDto } from "src/dto/items/create-item.dto";
import { UpdateItemDto } from "src/dto/items/update-item.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("item")
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: ItemFields,
        descendants: RELATIONS_OBJECT.item.descendants,
    })
    async getItems(
        @Query(new GET_Pipe(ItemFields, RELATIONS_OBJECT.item.ascendants))
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Item[]> =
            await this.itemsService.getItems(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single item using its ID" })
    async getItemById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Item> =
            await this.itemsService.getItemById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateItemDto, "create a new item")
    async createItem(
        @Body(new POST_PATCH_Pipe(TablesNames.ITEM))
        createItemDto: CreateItemDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Item> =
            await this.itemsService.createItem(createItemDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateItemDto, "update a item")
    async updateItem(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.ITEM))
        updateItemDto: UpdateItemDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.itemsService.updateItem(id, updateItemDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete items")
    async deleteItem(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.itemsService.deleteItem(query, getUserTokenData(req));

        return res.status(response.status).json(response);
    }
}
