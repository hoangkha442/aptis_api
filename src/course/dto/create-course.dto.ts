import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Khóa luyện thi APTIS nâng cao' })
  course_name: string;

  @ApiProperty({
    example: 'Khóa học dành cho sinh viên ôn thi chứng chỉ APTIS, kéo dài 6 tuần.',
    required: false,
  })
  description?: string;
}
