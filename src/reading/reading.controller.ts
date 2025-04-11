import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { ReadingTestIdDto } from 'src/reading/dto/reading-test-id.dto';


@ApiTags("Reading")
@Controller('reading')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Get('get-all-reading-key')
  getAll(@Req() req: RequestWithUser) {
    const user_id = req.user.data.user_id; 
    return this.readingService.getAll(user_id);
  }

  @Post('reading-id-test')
  findReadingDependOnID(@Req() req: RequestWithUser, @Body() body: ReadingTestIdDto) {
    const { reading_test_id } = body;
    const user_id = req.user.data.user_id; 
    return this.readingService.findReadingDependOnID(user_id, reading_test_id);
  }
}
