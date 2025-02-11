import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectionsModule } from "../collections/collections.module";
import { BusinessesModule } from "../businesses/businesses.module";

import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { Item } from "src/entities/item.entity";

@Module({
    imports: [
        CollectionsModule,
        BusinessesModule,
        TypeOrmModule.forFeature([Item]),
    ],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [ItemsService],
})
export class ItemsModule {}
