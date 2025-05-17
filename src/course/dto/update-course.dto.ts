import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({ example: 'Khóa APTIS cơ bản', required: false })
  course_name?: string;

  @ApiProperty({
    example: 'Phiên bản cập nhật nội dung mới nhất theo đề thi APTIS tháng 6.',
    required: false,
  })
  description?: string;
}
