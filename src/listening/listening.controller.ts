import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ListeningService } from './listening.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ListeningTestIdDto } from './dto/listening-test-id.dto';
import { RequestWithUser } from 'src/interfaces';

@ApiTags("Listening")
@Controller('listening')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Get('get-all-listening-key')
  getAll(@Req() req: RequestWithUser) {
    const user_id = req.user.data.user_id;
    return this.listeningService.getAllListeningKeys(user_id);
  }

  @Post('listening-id-test')
  getListeningById(@Req() req: RequestWithUser, @Body() body: ListeningTestIdDto) {
    const user_id = req.user.data.user_id;
    const { listening_test_id } = body;
    return this.listeningService.getListeningById(user_id, listening_test_id);
  }
}
