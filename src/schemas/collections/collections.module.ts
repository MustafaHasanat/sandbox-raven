import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessesModule } from "../businesses/businesses.module";

import { CollectionsService } from "./collections.service";
import { CollectionsController } from "./collections.controller";
import { Collection } from "src/entities/collection.entity";

@Module({
    imports: [BusinessesModule, TypeOrmModule.forFeature([Collection])],
    controllers: [CollectionsController],
    providers: [CollectionsService],
    exports: [CollectionsService],
})
export class CollectionsModule {}
