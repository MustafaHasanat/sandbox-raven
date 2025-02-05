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
import { CreateBusinessDto } from "src/dto/businesses/create-business.dto";
import { UpdateBusinessDto } from "src/dto/businesses/update-business.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Business } from "src/entities";

@Injectable()
export class BusinessesService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Business)
        private readonly businessRepository: Repository<Business>
    ) {}

    // --- Basic CRUD APIs ---

    async getBusinesses(
        query: FindManyOptions
    ): Promise<CustomResponseType<Business[]>> {
        return await getAllHandler<Business>({
            query,
            repository: this.businessRepository,
            table: "Businesses",
        });
    }

    async getBusinessById(id: string): Promise<CustomResponseType<Business>> {
        return await getByIdHandler<Business>({
            id,
            repository: this.businessRepository,
            table: "Business",
        });
    }

    async createBusiness(
        createBusinessDto: CreateBusinessDto
    ): Promise<CustomResponseType<Business>> {
        try {
            const response = await createHandler<Business>({
                dto: createBusinessDto,
                repository: this.businessRepository,
            });

            return newInstanceRes<Business>(
                "Business has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateBusiness(
        id: string,
        updateBusinessDto: UpdateBusinessDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Business>({
                id,
                dto: updateBusinessDto,
                table: "Business",
                repository: this.businessRepository,
            });

            return updatedRes<UpdateResult>(
                "Business has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteBusiness(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Business>({
            id,
            wipe,
            repository: this.businessRepository,
            table: "Business",
            userTokenData,
        });
    }
}
