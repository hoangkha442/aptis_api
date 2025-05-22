import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WritingService } from './writing.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';
import { CreateWritingQuestionDto, CreateWritingTestDto, WritingTestIdDto } from 'src/writing/dto/create-writing.dto';


@ApiTags('Writing')
@Controller('writing')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Get('get-all-writing-tests')
  getAllWritingTests(@Req() req: RequestWithUser) {
    return this.writingService.getAllWritingTests();
  }

  @Post('get-writing-by-id')
  getWritingById(@Body() body: WritingTestIdDto) {
    return this.writingService.getWritingById(body.writing_test_id);
  }

  @Post('create-writing-test')
  createWritingTest(@Body() body: CreateWritingTestDto) {
    return this.writingService.createWritingTest(body);
  }

  @Post('create-writing-question')
  createWritingQuestion(@Body() body: CreateWritingQuestionDto) {
    return this.writingService.createWritingQuestion(body);
  }

  @Put('update-writing-test/:id')
  updateWritingTest(@Param('id') id: string, @Body() body: CreateWritingTestDto) {
    return this.writingService.updateWritingTest(+id, body);
  }

  @Put('update-writing-question/:id')
  updateWritingQuestion(
    @Param('id') id: string,
    @Body() body: CreateWritingQuestionDto,
  ) {
    return this.writingService.updateWritingQuestion(+id, body);
  }


  @Delete('delete-writing-question/:id')
  deleteWritingQuestion(@Param('id') id: string) {
    return this.writingService.deleteWritingQuestion(+id);
  }
}