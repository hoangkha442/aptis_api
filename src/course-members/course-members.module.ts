import { Module } from '@nestjs/common';
import { CourseMembersService } from './course-members.service';
import { CourseMembersController } from './course-members.controller';

@Module({
  controllers: [CourseMembersController],
  providers: [CourseMembersService],
})
export class CourseMembersModule {}
