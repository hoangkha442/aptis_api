import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingPart1Dto {
  @ApiProperty({ example: 1, description: 'ID của bài reading_test' })
  reading_test_id: number;

  @ApiProperty({ example: 'Question 1 of 5', description: 'Tiêu đề câu hỏi' })
  title: string;

  @ApiProperty({ example: 'Đọc email và chọn từ đúng', description: 'Mô tả câu hỏi' })
  description: string;

  @ApiProperty({ example: 'I go to the ___ every morning.', description: 'Nội dung câu hỏi' })
  content: string;

  @ApiProperty({ example: 'park', description: 'Đáp án đúng' })
  correct_answer: string;

  @ApiProperty({ example: '["park", "school", "shop"]', description: 'Danh sách đáp án lựa chọn (dạng JSON string)' })
  options: string;
}