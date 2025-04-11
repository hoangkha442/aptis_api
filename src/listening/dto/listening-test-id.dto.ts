import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ListeningTestIdDto {
@ApiProperty({ example: 1, description: 'ID của bài listening_test' })
  @IsNumber()
  listening_test_id: number;
}
