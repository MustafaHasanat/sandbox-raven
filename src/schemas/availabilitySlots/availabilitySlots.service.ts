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
import { CreateAvailabilitySlotDto } from "src/dto/availabilitySlots/create-availabilitySlot.dto";
import { UpdateAvailabilitySlotDto } from "src/dto/availabilitySlots/update-availabilitySlot.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { AvailabilitySlot } from "src/entities";

@Injectable()
export class AvailabilitySlotsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(AvailabilitySlot)
        private readonly availabilitySlotRepository: Repository<AvailabilitySlot>
    ) {}

    // --- Basic CRUD APIs ---

    async getAvailabilitySlots(
        query: FindManyOptions
    ): Promise<CustomResponseType<AvailabilitySlot[]>> {
        return await getAllHandler<AvailabilitySlot>({
            query,
            repository: this.availabilitySlotRepository,
            table: "AvailabilitySlots",
        });
    }

    async getAvailabilitySlotById(
        id: string
    ): Promise<CustomResponseType<AvailabilitySlot>> {
        return await getByIdHandler<AvailabilitySlot>({
            id,
            repository: this.availabilitySlotRepository,
            table: "AvailabilitySlot",
        });
    }

    async createAvailabilitySlot(
        createAvailabilitySlotDto: CreateAvailabilitySlotDto
    ): Promise<CustomResponseType<AvailabilitySlot>> {
        try {
            const response = await createHandler<AvailabilitySlot>({
                dto: createAvailabilitySlotDto,
                repository: this.availabilitySlotRepository,
            });

            return newInstanceRes<AvailabilitySlot>(
                "AvailabilitySlot has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateAvailabilitySlot(
        id: string,
        updateAvailabilitySlotDto: UpdateAvailabilitySlotDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<AvailabilitySlot>({
                id,
                dto: updateAvailabilitySlotDto,
                table: "AvailabilitySlot",
                repository: this.availabilitySlotRepository,
            });

            return updatedRes<UpdateResult>(
                "AvailabilitySlot has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteAvailabilitySlot(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<AvailabilitySlot>({
            id,
            wipe,
            repository: this.availabilitySlotRepository,
            table: "AvailabilitySlot",
            userTokenData,
        });
    }
}
