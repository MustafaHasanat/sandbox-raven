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
import { CreateCaramelDto } from "src/dto/caramels/create-caramel.dto";
import { UpdateCaramelDto } from "src/dto/caramels/update-caramel.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Caramel } from "src/entities";

@Injectable()
export class CaramelsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Caramel)
        private readonly caramelRepository: Repository<Caramel>
    ) {}

    // --- Basic CRUD APIs ---

    async getCaramels(
        query: FindManyOptions
    ): Promise<CustomResponseType<Caramel[]>> {
        return await getAllHandler<Caramel>({
            query,
            repository: this.caramelRepository,
            table: "Caramels",
        });
    }

    async getCaramelById(id: string): Promise<CustomResponseType<Caramel>> {
        return await getByIdHandler<Caramel>({
            id,
            repository: this.caramelRepository,
            table: "Caramel",
        });
    }

    async createCaramel(
        createCaramelDto: CreateCaramelDto
    ): Promise<CustomResponseType<Caramel>> {
        try {
            const response = await createHandler<Caramel>({
                dto: createCaramelDto,
                repository: this.caramelRepository,
            });

            return newInstanceRes<Caramel>(
                "Caramel has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateCaramel(
        id: string,
        updateCaramelDto: UpdateCaramelDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Caramel>({
                id,
                dto: updateCaramelDto,
                table: "Caramel",
                repository: this.caramelRepository,
            });

            return updatedRes<UpdateResult>(
                "Caramel has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteCaramel(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Caramel>({
            id,
            wipe,
            repository: this.caramelRepository,
            table: "Caramel",
            userTokenData,
        });
    }
}
