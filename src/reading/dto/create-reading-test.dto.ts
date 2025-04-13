import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingTestDto {
  @ApiProperty({ example: 'Key Test 1', description: 'Mã key của bài test' })
  key_test: string;

  @ApiProperty({ example: 'Reading key test 01', description: 'Tiêu đề bài test' })
  tittle: string;

  @ApiProperty({ example: 'Entry-level reading test', description: 'Mô tả bài test' })
  description: string;

  @ApiProperty({ example: 35, description: 'Thời lượng làm bài (phút)' })
  duration: number;
}