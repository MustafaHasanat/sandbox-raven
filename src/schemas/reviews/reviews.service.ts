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
import { CreateReviewDto } from "src/dto/reviews/create-review.dto";
import { UpdateReviewDto } from "src/dto/reviews/update-review.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Review } from "src/entities";

@Injectable()
export class ReviewsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ) {}

    // --- Basic CRUD APIs ---

    async getReviews(
        query: FindManyOptions
    ): Promise<CustomResponseType<Review[]>> {
        return await getAllHandler<Review>({
            query,
            repository: this.reviewRepository,
            table: "Reviews",
        });
    }

    async getReviewById(id: string): Promise<CustomResponseType<Review>> {
        return await getByIdHandler<Review>({
            id,
            repository: this.reviewRepository,
            table: "Review",
        });
    }

    async createReview(
        createReviewDto: CreateReviewDto
    ): Promise<CustomResponseType<Review>> {
        try {
            const response = await createHandler<Review>({
                dto: createReviewDto,
                repository: this.reviewRepository,
            });

            return newInstanceRes<Review>(
                "Review has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateReview(
        id: string,
        updateReviewDto: UpdateReviewDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Review>({
                id,
                dto: updateReviewDto,
                table: "Review",
                repository: this.reviewRepository,
            });

            return updatedRes<UpdateResult>(
                "Review has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteReview(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Review>({
            id,
            wipe,
            repository: this.reviewRepository,
            table: "Review",
            userTokenData,
        });
    }
}
