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
import { ListeningService } from './listening.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ListeningTestIdDto } from './dto/listening-test-id.dto';
import { RequestWithUser } from 'src/interfaces';
import {
  CreateListeningItemDto,
  CreateListeningTestDto,
} from 'src/listening/dto/create-listening.dto';

@ApiTags('Listening')
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
  getListeningById(
    @Req() req: RequestWithUser,
    @Body() body: ListeningTestIdDto,
  ) {
    const user_id = req.user.data.user_id;
    const { listening_test_id } = body;
    return this.listeningService.getListeningById(user_id, listening_test_id);
  }

  @Post('create-test')
  createTest(@Body() body: CreateListeningTestDto) {
    return this.listeningService.createListeningTest(body);
  }

  @Post('create-item')
  createItem(@Body() body: CreateListeningItemDto) {
    return this.listeningService.createListeningItem(body);
  }

  @Put('update-test/:id')
  updateListeningTest(
    @Param('id') id: string,
    @Body() body: CreateListeningTestDto,
  ) {
    const listening_test_id = parseInt(id);
    return this.listeningService.updateListeningTest(listening_test_id, body);
  }

  @Put('update-item/:id')
  updateListeningItem(
    @Param('id') id: string,
    @Body() body: CreateListeningItemDto,
  ) {
    const listening_test_items_id = parseInt(id);
    return this.listeningService.updateListeningItem(
      listening_test_items_id,
      body,
    );
  }

  @Delete('delete-item/:id')
  deleteListeningItem(@Param('id') id: string) {
    const listening_test_items_id = parseInt(id);
    return this.listeningService.deleteListeningItem(listening_test_items_id);
  }
}
