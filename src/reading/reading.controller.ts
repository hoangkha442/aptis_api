import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { ReadingTestIdDto } from './dto/reading-test-id.dto';
import { CreateReadingTestDto } from './dto/create-reading-test.dto';
import { CreateReadingPart1Dto } from './dto/create-reading-part1.dto';
import { CreateReadingPart2Dto } from './dto/create-reading-part2.dto';
import { CreateReadingPart3Dto } from './dto/create-reading-part3.dto';
import { CreateReadingPart4Dto } from './dto/create-reading-part4.dto';
import { CreateReadingPart5Dto } from './dto/create-reading-part5.dto';

@ApiTags('Reading')
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

  @Post('create-test')
  createTest(@Body() dto: CreateReadingTestDto) {
    return this.readingService.createReadingTest(dto);
  }

  @Post('create-part1')
  createPart1(@Body() dto: CreateReadingPart1Dto) {
    return this.readingService.createReadingPart1(dto);
  }
  @Post('create-part2')
  createPart2(@Body() dto: CreateReadingPart2Dto) {
    return this.readingService.createReadingPart2(dto);
  }

  @Post('create-part3')
  createPart3(@Body() dto: CreateReadingPart3Dto) {
    return this.readingService.createReadingPart3(dto);
  }

  @Post('create-part4')
  createPart4(@Body() dto: CreateReadingPart4Dto) {
    return this.readingService.createReadingPart4(dto);
  }

  @Post('create-part5')
  createPart5(@Body() dto: CreateReadingPart5Dto) {
    return this.readingService.createReadingPart5(dto);
  }

  // SỬA
  @Put('update-part1/:id')
  updatePart1(@Param('id') id: string, @Body() dto: CreateReadingPart1Dto) {
    return this.readingService.updateReadingPart1(+id, dto);
  }
  @Put('update-part2/:id')
  updatePart2(@Param('id') id: string, @Body() dto: CreateReadingPart2Dto) {
    return this.readingService.updateReadingPart2(+id, dto);
  }
  @Put('update-part3/:id')
  updatePart3(@Param('id') id: string, @Body() dto: CreateReadingPart3Dto) {
    return this.readingService.updateReadingPart3(+id, dto);
  }
  @Put('update-part4/:id')
  updatePart4(@Param('id') id: string, @Body() dto: CreateReadingPart4Dto) {
    return this.readingService.updateReadingPart4(+id, dto);
  }
  @Put('update-part5/:id')
  updatePart5(@Param('id') id: string, @Body() dto: CreateReadingPart5Dto) {
    return this.readingService.updateReadingPart5(+id, dto);
  }
  
  // XOÁ
  @Delete('delete-part1/:id')
  deletePart1(@Param('id') id: string) {
    return this.readingService.deleteReadingPart1(+id);
  }
  @Delete('delete-part2/:id')
  deletePart2(@Param('id') id: string) {
    return this.readingService.deleteReadingPart2(+id);
  }
  @Delete('delete-part3/:id')
  deletePart3(@Param('id') id: string) {
    return this.readingService.deleteReadingPart3(+id);
  }
  @Delete('delete-part4/:id')
  deletePart4(@Param('id') id: string) {
    return this.readingService.deleteReadingPart4(+id);
  }
  @Delete('delete-part5/:id')
  deletePart5(@Param('id') id: string) {
    return this.readingService.deleteReadingPart5(+id);
  }
  

  
}