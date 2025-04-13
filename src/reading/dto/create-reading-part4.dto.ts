import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingPart4Dto {
  @ApiProperty({ example: 1, description: 'ID của bài reading_test' })
  reading_test_id: number;

  @ApiProperty({ example: 'Question 4 of 5', description: 'Tiêu đề câu hỏi' })
  title: string;

  @ApiProperty({ example: 'Ai là người nói câu này?', description: 'Mô tả câu hỏi' })
  description: string;

  @ApiProperty({ example: 'Person A: I love volunteering.', description: 'Đoạn văn' })
  paragraph_text: string;

  @ApiProperty({ example: 'Who likes helping?', description: 'Câu hỏi nhỏ' })
  content: string;

  @ApiProperty({ example: 'A', description: 'Đáp án đúng' })
  correct_answer: string;

  @ApiProperty({ example: '["A", "B", "C", "D"]', description: 'Danh sách lựa chọn (JSON string)' })
  options: string;
}