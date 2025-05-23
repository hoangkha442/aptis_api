import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeakingTestDto {
  @ApiProperty({ example: 'SPK_001', description: 'Mã đề thi Speaking' })
  key_test?: string;

  @ApiProperty({ example: 'Aptis Speaking Test 1', description: 'Tiêu đề của đề thi Speaking' })
  title: string;

  @ApiProperty({ example: 'This is the first Aptis speaking test.', description: 'Mô tả ngắn về đề thi Speaking' })
  description?: string;
}

export class CreateSpeakingQuestionDto {
  @ApiProperty({ example: 1, description: 'ID của đề thi Speaking chứa câu hỏi này' })
  speaking_test_id: number;

  @ApiProperty({ example: 1, description: 'Phần thi (1–4) tương ứng với câu hỏi Aptis' })
  part_number: number;

  @ApiProperty({ example: 2, description: 'Số thứ tự câu hỏi trong phần' })
  question_number: number;

  @ApiProperty({ example: 'Describe a time when you helped someone.', description: 'Nội dung câu hỏi' })
  prompt: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Đường dẫn ảnh minh họa (nếu có)', required: false })
  image_url?: string;

  @ApiProperty({ example: 'https://example.com/audio.mp3', description: 'Đường dẫn file audio đọc câu hỏi (nếu có)', required: false })
  audio_url?: string;

  @ApiProperty({ example: 45, description: 'Thời gian trả lời đề xuất (tính bằng giây)' })
  suggested_time: number;
}