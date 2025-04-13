import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingPart3Dto {
  @ApiProperty({ example: 1, description: 'ID của bài reading_test' })
  reading_test_id: number;

  @ApiProperty({ example: 'Question 3 of 5', description: 'Tiêu đề câu hỏi' })
  title: string;

  @ApiProperty({ example: 'Using public cycle', description: 'Tên bài test nhỏ' })
  name_of_test: string;

  @ApiProperty({ example: 'Sắp xếp các đoạn văn sau', description: 'Mô tả câu hỏi' })
  description: string;

  @ApiProperty({ example: 'Cycling is an efficient way to travel.', description: 'Nội dung đoạn văn' })
  content: string;

  @ApiProperty({ example: 2, description: 'Thứ tự sắp xếp đúng' })
  sort_order: number;
}