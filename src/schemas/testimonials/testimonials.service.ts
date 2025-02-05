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
import { CreateTestimonialDto } from "src/dto/testimonials/create-testimonial.dto";
import { UpdateTestimonialDto } from "src/dto/testimonials/update-testimonial.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Testimonial } from "src/entities";

@Injectable()
export class TestimonialsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Testimonial)
        private readonly testimonialRepository: Repository<Testimonial>
    ) {}

    // --- Basic CRUD APIs ---

    async getTestimonials(
        query: FindManyOptions
    ): Promise<CustomResponseType<Testimonial[]>> {
        return await getAllHandler<Testimonial>({
            query,
            repository: this.testimonialRepository,
            table: "Testimonials",
        });
    }

    async getTestimonialById(
        id: string
    ): Promise<CustomResponseType<Testimonial>> {
        return await getByIdHandler<Testimonial>({
            id,
            repository: this.testimonialRepository,
            table: "Testimonial",
        });
    }

    async createTestimonial(
        createTestimonialDto: CreateTestimonialDto
    ): Promise<CustomResponseType<Testimonial>> {
        try {
            const response = await createHandler<Testimonial>({
                dto: createTestimonialDto,
                repository: this.testimonialRepository,
            });

            return newInstanceRes<Testimonial>(
                "Testimonial has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateTestimonial(
        id: string,
        updateTestimonialDto: UpdateTestimonialDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Testimonial>({
                id,
                dto: updateTestimonialDto,
                table: "Testimonial",
                repository: this.testimonialRepository,
            });

            return updatedRes<UpdateResult>(
                "Testimonial has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteTestimonial(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Testimonial>({
            id,
            wipe,
            repository: this.testimonialRepository,
            table: "Testimonial",
            userTokenData,
        });
    }
}
