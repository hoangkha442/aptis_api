import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';
import { CreateSpeakingTestDto, CreateSpeakingQuestionDto } from './dto/create-speaking.dto';

@ApiTags('Speaking')
@Controller('speaking')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class SpeakingController {
  constructor(private readonly speakingService: SpeakingService) {}

  @Get('get-all-speaking-key')
  getAll(@Req() req: RequestWithUser) {
    const user_id = req.user.data.user_id;
    return this.speakingService.getAllSpeakingKeys(user_id);
  }

  @Post('speaking-id-test')
  getSpeakingById(
    @Req() req: RequestWithUser,
    @Body('speaking_test_id') speaking_test_id: number,
  ) {
    const user_id = req.user.data.user_id;
    return this.speakingService.getSpeakingById(user_id, speaking_test_id);
  }

  @Post('create-test')
  createTest(@Body() body: CreateSpeakingTestDto) {
    return this.speakingService.createSpeakingTest(body);
  }

  @Post('create-question')
  createQuestion(@Body() body: CreateSpeakingQuestionDto) {
    return this.speakingService.createSpeakingQuestion(body);
  }

  @Put('update-test/:id')
  updateSpeakingTest(
    @Param('id') id: string,
    @Body() body: CreateSpeakingTestDto,
  ) {
    const speaking_test_id = parseInt(id);
    return this.speakingService.updateSpeakingTest(speaking_test_id, body);
  }

  @Put('update-question/:id')
  updateSpeakingQuestion(
    @Param('id') id: string,
    @Body() body: CreateSpeakingQuestionDto,
  ) {
    const question_id = parseInt(id);
    return this.speakingService.updateSpeakingQuestion(question_id, body);
  }

  @Delete('delete-question/:id')
  deleteSpeakingQuestion(@Param('id') id: string) {
    const question_id = parseInt(id);
    return this.speakingService.deleteSpeakingQuestion(question_id);
  }
}