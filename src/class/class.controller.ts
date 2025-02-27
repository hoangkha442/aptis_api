import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('statistics')
  async getClassStatistics(
    @Req() req: RequestWithUser,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const userId = req.user.data.user_id;
    return this.classService.getClassStatistics(userId, Number(page), Number(limit));
  }
}
