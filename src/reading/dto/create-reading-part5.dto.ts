// 📁 src/reading/dto/create-reading-part5.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingPart5Dto {
  @ApiProperty({ example: 1, description: 'ID của bài reading_test' })
  reading_test_id: number;

  @ApiProperty({ example: 'Question 5 of 5', description: 'Tiêu đề câu hỏi' })
  title: string;

  @ApiProperty({ example: 'History of Zoos', description: 'Tên bài test nhỏ' })
  name_of_test: string;

  @ApiProperty({ example: 'Chọn tiêu đề cho từng đoạn văn', description: 'Mô tả bài tập' })
  description: string;

  @ApiProperty({ example: 'Opening the door for everyone', description: 'Nội dung đoạn văn' })
  content: string;

  @ApiProperty({ example: 2, description: 'Thứ tự đoạn văn' })
  sort_order: number;
} 
