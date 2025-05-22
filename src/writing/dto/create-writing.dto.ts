import { ApiProperty } from '@nestjs/swagger';

export class CreateWritingTestDto {
  @ApiProperty({
    example: 'WRT-001',
    description: 'Mã định danh duy nhất cho đề viết (không bắt buộc)',
  })
  key_test?: string;

  @ApiProperty({
    example: 'Sample Writing Test',
    description: 'Tiêu đề của đề viết',
  })
  title: string;

  @ApiProperty({
    example: 'This is a sample 4-part writing test.',
    description: 'Mô tả ngắn gọn cho đề viết (nếu có)',
  })
  description?: string;
}

export class CreateWritingQuestionDto {
  @ApiProperty({
    example: 1,
    description: 'ID của đề viết (writing_test_id)',
  })
  writing_test_id: number;

  @ApiProperty({
    example: 3,
    description: 'Số thứ tự phần viết (Part 1 đến Part 4)',
  })
  part_number: number;

  @ApiProperty({
    example: 2,
    description: 'Số thứ tự câu hỏi trong từng phần',
  })
  question_number: number;

  @ApiProperty({
    example: 'What is your favourite place?',
    description: 'Nội dung câu hỏi',
  })
  prompt: string;

  @ApiProperty({
    example: 'Miguel',
    description: 'Tên người hỏi (chỉ dùng cho Part 3)',
    required: false,
  })
  from_name?: string;

  @ApiProperty({
    example: '30–40 words',
    description: 'Giới hạn số từ cho câu trả lời (nếu có)',
    required: false,
  })
  word_limit?: string;

  @ApiProperty({
    example: 'paragraph',
    description: 'Loại câu trả lời: short_text, paragraph hoặc email',
  })
  answer_type: string;

  @ApiProperty({
    example: 'Gửi cho bạn',
    description: 'Ghi chú thêm nếu có, ví dụ tên người nhận email (Part 4)',
    required: false,
  })
  note?: string;
}

export class WritingTestIdDto {
  @ApiProperty({
    example: 1,
    description: 'ID của đề viết cần lấy',
  })
  writing_test_id: number;
}
