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
import { ReviewsService } from "./reviews.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { ReviewFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Review } from "src/entities/review.entity";
import { CreateReviewDto } from "src/dto/reviews/create-review.dto";
import { UpdateReviewDto } from "src/dto/reviews/update-review.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("review")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: ReviewFields,
        descendants: RELATIONS_OBJECT.review.descendants,
    })
    async getReviews(
        @Query(new GET_Pipe(ReviewFields, RELATIONS_OBJECT.review.ascendants))
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Review[]> =
            await this.reviewsService.getReviews(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single review using its ID" })
    async getReviewById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Review> =
            await this.reviewsService.getReviewById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateReviewDto, "create a new review")
    async createReview(
        @Body(new POST_PATCH_Pipe(TablesNames.REVIEW))
        createReviewDto: CreateReviewDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Review> =
            await this.reviewsService.createReview(createReviewDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateReviewDto, "update a review")
    async updateReview(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.REVIEW))
        updateReviewDto: UpdateReviewDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.reviewsService.updateReview(id, updateReviewDto);

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete reviews")
    async deleteReview(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.reviewsService.deleteReview(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
