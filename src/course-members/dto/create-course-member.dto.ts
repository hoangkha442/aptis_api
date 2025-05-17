import { ApiProperty } from '@nestjs/swagger';
import { users_role } from '@prisma/client';

export class CreateCourseMemberDto {
  @ApiProperty({ example: 5 })
  user_id: number;

  @ApiProperty({ example: 2 })
  course_id: number;

  @ApiProperty({ example: 'student', enum: users_role })
  role: users_role;
}
