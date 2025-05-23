import { PartialType } from '@nestjs/swagger';
import { CreateSpeakingTestDto } from './create-speaking.dto';

export class UpdateSpeakingDto extends PartialType(CreateSpeakingTestDto) {}
