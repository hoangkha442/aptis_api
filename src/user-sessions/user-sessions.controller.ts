import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserSessionsService } from './user-sessions.service';
import { CreateUserSessionDto } from './dto/create-user-session.dto';
import { UpdateUserSessionDto } from './dto/update-user-session.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';
@ApiTags('User Sessions')
@Controller('user-sessions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user-sessions')
export class UserSessionsController {
  constructor(private readonly userSessionsService: UserSessionsService) {}

  @Get('user/:user_id')
  async findByUser(@Param('user_id') user_id: number, @Req() req: RequestWithUser) {
    const admin_id = req.user.data.user_id;
    return this.userSessionsService.findByUser(user_id, admin_id);
  }

  @Delete('session/:session_id')
  removeBySession(@Param('session_id') session_id: string, @Req() req: RequestWithUser) {
    const admin_id = req.user.data.user_id;

    return this.userSessionsService.removeBySession(session_id,admin_id);
  }
}
