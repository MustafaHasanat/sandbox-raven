import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessesModule } from "../businesses/businesses.module";
import { UsersModule } from "../users/users.module";

import { TestimonialsService } from "./testimonials.service";
import { TestimonialsController } from "./testimonials.controller";
import { Testimonial } from "src/entities/testimonial.entity";

@Module({
    imports: [
        BusinessesModule,
        UsersModule,
        TypeOrmModule.forFeature([Testimonial]),
    ],
    controllers: [TestimonialsController],
    providers: [TestimonialsService],
    exports: [TestimonialsService],
})
export class TestimonialsModule {}
