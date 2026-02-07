import { Module } from '@nestjs/common';
import { ProjectMembersService } from './project_members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMember } from './project_member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMember])],
  providers: [ProjectMembersService],
})
export class ProjectMembersModule {}
