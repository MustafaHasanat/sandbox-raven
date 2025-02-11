import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessesModule } from "../businesses/businesses.module";

import { TeamMembersService } from "./teamMembers.service";
import { TeamMembersController } from "./teamMembers.controller";
import { TeamMember } from "src/entities/teamMember.entity";

@Module({
    imports: [BusinessesModule, TypeOrmModule.forFeature([TeamMember])],
    controllers: [TeamMembersController],
    providers: [TeamMembersService],
    exports: [TeamMembersService],
})
export class TeamMembersModule {}
