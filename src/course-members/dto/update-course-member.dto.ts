import { ApiProperty } from '@nestjs/swagger';
import { users_role } from '@prisma/client';

export class UpdateCourseMemberDto {
  @ApiProperty({ example: 'lecturer', enum: users_role, required: false })
  role?: users_role;
}
