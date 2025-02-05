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
import { CreateCollectionDto } from "src/dto/collections/create-collection.dto";
import { UpdateCollectionDto } from "src/dto/collections/update-collection.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Collection } from "src/entities";

@Injectable()
export class CollectionsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Collection)
        private readonly collectionRepository: Repository<Collection>
    ) {}

    // --- Basic CRUD APIs ---

    async getCollections(
        query: FindManyOptions
    ): Promise<CustomResponseType<Collection[]>> {
        return await getAllHandler<Collection>({
            query,
            repository: this.collectionRepository,
            table: "Collections",
        });
    }

    async getCollectionById(
        id: string
    ): Promise<CustomResponseType<Collection>> {
        return await getByIdHandler<Collection>({
            id,
            repository: this.collectionRepository,
            table: "Collection",
        });
    }

    async createCollection(
        createCollectionDto: CreateCollectionDto
    ): Promise<CustomResponseType<Collection>> {
        try {
            const response = await createHandler<Collection>({
                dto: createCollectionDto,
                repository: this.collectionRepository,
            });

            return newInstanceRes<Collection>(
                "Collection has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateCollection(
        id: string,
        updateCollectionDto: UpdateCollectionDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Collection>({
                id,
                dto: updateCollectionDto,
                table: "Collection",
                repository: this.collectionRepository,
            });

            return updatedRes<UpdateResult>(
                "Collection has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteCollection(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Collection>({
            id,
            wipe,
            repository: this.collectionRepository,
            table: "Collection",
            userTokenData,
        });
    }
}
