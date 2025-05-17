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
import { CourseMembersService } from './course-members.service';
import { CreateCourseMemberDto } from './dto/create-course-member.dto';
import { UpdateCourseMemberDto } from './dto/update-course-member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';

@ApiTags('Course Members')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('course-members')
export class CourseMembersController {
  constructor(private readonly courseMembersService: CourseMembersService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() dto: CreateCourseMemberDto) {
    const user_id = req.user.data.user_id;
    return this.courseMembersService.create(dto); // có thể kiểm tra quyền ở đây nếu cần
  }

  @Get()
  findAll() {
    return this.courseMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseMembersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseMemberDto) {
    return this.courseMembersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMembersService.remove(+id);
  }
}
