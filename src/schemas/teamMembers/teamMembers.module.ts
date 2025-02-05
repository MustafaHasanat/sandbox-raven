import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TeamMembersService } from "./teamMembers.service";
import { TeamMembersController } from "./teamMembers.controller";
import { TeamMember } from "src/entities/teamMember.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TeamMember])],
    controllers: [TeamMembersController],
    providers: [TeamMembersService],
    exports: [TeamMembersService],
})
export class TeamMembersModule {}
