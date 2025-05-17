import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';

@ApiTags('Course')
@Controller('course')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() dto: CreateCourseDto) {
    const user_id = req.user.data.user_id;
    return this.courseService.create(user_id, dto);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const user_id = req.user.data.user_id;
    return this.courseService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    const user_id = req.user.data.user_id;
    return this.courseService.findOne(user_id, +id);
  }

  @Put(':id')
  update(@Req() req: RequestWithUser, @Param('id') id: string, @Body() dto: UpdateCourseDto) {
    const user_id = req.user.data.user_id;
    return this.courseService.update(user_id, +id, dto);
  }

  @Delete(':id')
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    const user_id = req.user.data.user_id;
    return this.courseService.remove(user_id, +id);
  }
}
