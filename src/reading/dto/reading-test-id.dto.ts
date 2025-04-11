import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReadingTestIdDto {
  @ApiProperty({ example: 2, description: 'ID của bài reading_test' })
  @IsNumber()
  reading_test_id: number;
}
