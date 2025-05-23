import { Module } from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { SpeakingController } from './speaking.controller';

@Module({
  controllers: [SpeakingController],
  providers: [SpeakingService],
})
export class SpeakingModule {}
