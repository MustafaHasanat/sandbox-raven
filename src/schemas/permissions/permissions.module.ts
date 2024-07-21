import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionsService } from "./permissions.service";
import { PermissionsController } from "./permissions.controller";
import { Permission } from "src/entities";

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    controllers: [PermissionsController],
    providers: [PermissionsService],
    exports: [PermissionsService],
})
export class PermissionsModule {}
