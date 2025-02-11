import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessesModule } from "../businesses/businesses.module";

import { AvailabilitySlotsService } from "./availabilitySlots.service";
import { AvailabilitySlotsController } from "./availabilitySlots.controller";
import { AvailabilitySlot } from "src/entities/availabilitySlot.entity";

@Module({
    imports: [BusinessesModule, TypeOrmModule.forFeature([AvailabilitySlot])],
    controllers: [AvailabilitySlotsController],
    providers: [AvailabilitySlotsService],
    exports: [AvailabilitySlotsService],
})
export class AvailabilitySlotsModule {}
