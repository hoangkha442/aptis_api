import { ApiProperty } from '@nestjs/swagger';

export class CreateListeningTestDto {
  @ApiProperty({ example: 'Key Test 2', description: 'Mã key bài listening test' })
  key_test: string;

  @ApiProperty({ example: 'Listening Test 02', description: 'Tiêu đề bài test' })
  tittle: string;

  @ApiProperty({ example: 'Listening test for intermediate level', description: 'Mô tả bài listening test' })
  description: string;

  @ApiProperty({ example: 45, description: 'Thời lượng bài test (phút)' })
  duration: number;
}

export class CreateListeningItemDto {
  @ApiProperty({ example: 1, description: 'ID của listening_test' })
  listening_test_id: number;

  @ApiProperty({ example: 'Question 1 - 13', description: 'Nhóm câu hỏi hoặc mã câu hỏi' })
  question_number: string;

  @ApiProperty({ example: 'Listening Question 1', description: 'Tiêu đề câu hỏi' })
  tittle: string;

  @ApiProperty({ example: 'Choose the correct answer.', description: 'Mô tả câu hỏi' })
  description: string;

  @ApiProperty({ example: 'What is the color of the car?', description: 'Nội dung câu hỏi' })
  content: string;

  @ApiProperty({ example: 'Red', description: 'Đáp án đúng' })
  correct_answer: string;

  @ApiProperty({ example: '["Red", "Blue", "Green"]', description: 'Danh sách đáp án (JSON string)' })
  options: string;

  @ApiProperty({ example: 'The car is red because...', description: 'Script nội dung nghe' })
  script: string;

  @ApiProperty({ example: 'Colors', description: 'Chủ đề của bài nghe' })
  topic: string;
}