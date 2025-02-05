import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CaramelsService } from "./caramels.service";
import { CaramelsController } from "./caramels.controller";
import { Caramel } from "src/entities/caramel.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Caramel])],
    controllers: [CaramelsController],
    providers: [CaramelsService],
    exports: [CaramelsService],
})
export class CaramelsModule {}
