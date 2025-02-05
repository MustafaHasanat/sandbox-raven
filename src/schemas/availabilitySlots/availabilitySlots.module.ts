import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AvailabilitySlotsService } from "./availabilitySlots.service";
import { AvailabilitySlotsController } from "./availabilitySlots.controller";
import { AvailabilitySlot } from "src/entities/availabilitySlot.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AvailabilitySlot])],
    controllers: [AvailabilitySlotsController],
    providers: [AvailabilitySlotsService],
    exports: [AvailabilitySlotsService],
})
export class AvailabilitySlotsModule {}
