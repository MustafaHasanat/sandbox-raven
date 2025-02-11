import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsModule } from "../items/items.module";
import { BusinessesModule } from "../businesses/businesses.module";
import { UsersModule } from "../users/users.module";

import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { Review } from "src/entities/review.entity";

@Module({
    imports: [
        ItemsModule,
        BusinessesModule,
        UsersModule,
        TypeOrmModule.forFeature([Review]),
    ],
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ReviewsModule {}
