import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() bodyLogin: bodyLogin, @Req() req: Request) {
    try {
      return await this.authService.login(bodyLogin, req);
    } catch (err) {
      throw new HttpException(
        err.response || 'Đăng nhập thất bại',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get-info')
  async getMyInfo(@Req() req: RequestWithUser) {
    return this.authService.getMyInfo(req.user.data.user_id, req);
  }

  @Post('signup')
  async signup(@Body() bodySignup: BodySignup) {
    return this.authService.signup(bodySignup);
  }

}
