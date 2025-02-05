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
import { TestimonialsService } from "./testimonials.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
} from "src/decorators";
import { CustomResponseType, DeleteQueryProps } from "src/types";
import { TestimonialFields, TablesNames } from "src/enums/tables.enum";
import { RELATIONS_OBJECT } from "src/constants/relations";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "src/pipes";
import { Testimonial } from "src/entities/testimonial.entity";
import { CreateTestimonialDto } from "src/dto/testimonials/create-testimonial.dto";
import { UpdateTestimonialDto } from "src/dto/testimonials/update-testimonial.dto";
import { DeletionQuery } from "src/decorators/delete.decorator";
import { getUserTokenData } from "src/helpers";

@ControllerWrapper("testimonial")
export class TestimonialsController {
    constructor(private readonly testimonialsService: TestimonialsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: TestimonialFields,
        descendants: RELATIONS_OBJECT.testimonial.descendants,
    })
    async getTestimonials(
        @Query(
            new GET_Pipe(
                TestimonialFields,
                RELATIONS_OBJECT.testimonial.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Testimonial[]> =
            await this.testimonialsService.getTestimonials(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single testimonial using its ID" })
    async getTestimonialById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Testimonial> =
            await this.testimonialsService.getTestimonialById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateTestimonialDto, "create a new testimonial")
    async createTestimonial(
        @Body(new POST_PATCH_Pipe(TablesNames.TESTIMONIAL))
        createTestimonialDto: CreateTestimonialDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Testimonial> =
            await this.testimonialsService.createTestimonial(
                createTestimonialDto
            );

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateTestimonialDto, "update a testimonial")
    async updateTestimonial(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.TESTIMONIAL))
        updateTestimonialDto: UpdateTestimonialDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.testimonialsService.updateTestimonial(
                id,
                updateTestimonialDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete testimonials")
    async deleteTestimonial(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.testimonialsService.deleteTestimonial(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
