import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Lập trình Web' })
  @IsOptional()
  @IsString()
  course_name?: string;

  @ApiProperty({ example: 'Khóa học lập trình từ A-Z' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  user_id?: number;
}
