import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingPart2Dto {
  @ApiProperty({ example: 1, description: 'ID của bài reading_test' })
  reading_test_id: number;

  @ApiProperty({ example: 'Question 2 of 5', description: 'Tiêu đề câu hỏi' })
  title: string;

  @ApiProperty({ example: 'Buying a new house', description: 'Tên bài test nhỏ' })
  name_of_test: string;

  @ApiProperty({ example: 'Sắp xếp đoạn văn', description: 'Mô tả câu hỏi' })
  description: string;

  @ApiProperty({ example: 'The most important factor is price.', description: 'Nội dung câu' })
  content: string;

  @ApiProperty({ example: 1, description: 'Thứ tự sắp xếp đúng' })
  sort_order: number;
}