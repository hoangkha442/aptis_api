import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';
import { GoogleDriveService } from 'src/auth/google-drive.service';
import { Response } from 'express';
import { google } from 'googleapis';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly driveService: GoogleDriveService,
  ) {}

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

  // @Get('google')
  // googleAuth(@Res() res: Response) {
  //   const url = this.driveService.getAuthUrl();
  //   res.redirect(url);
  // }

  // @Get('google/callback')
  // async googleCallback(@Query('code') code: string, @Res() res: Response) {
  //   await this.driveService.setCredentials(code);
  //   res.redirect('http://localhost:5173/'); // Frontend URL
  // }

  @Get('videos')
  async listFiles(@Query('folderId') folderId: string) {
    return await this.driveService.getFilesInFolder(folderId);
  }

  @Get('video/:fileId')
  async streamVideo(
    @Param('fileId') fileId: string,
    @Res() res: Response,
    @Req() req: RequestWithUser,
  ) {
    const stream = await this.driveService.getDriveFileStream(fileId);
    res.setHeader('Content-Type', 'video/mp4');
    stream.pipe(res);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @Get('video/stream/:fileId')
  // async streamVideoMSE(@Param('fileId') fileId: string, @Res() res: Response) {
  //   const stream = await this.driveService.getDriveFileStream(fileId);
  //   res.setHeader('Content-Type', 'video/mp4');
  //   stream.pipe(res);
  // }


  // @Get('video/secure/:fileId')
  // async streamVideoSecure(
  //   @Param('fileId') fileId: string,
  //   // @Req() req: RequestWithUser,
  //   @Res() res: Response,
  // ) {
  //   const stream = await this.driveService.getDriveFileStream(fileId);
  //   if (!stream) {
  //     throw new HttpException('File not found', HttpStatus.NOT_FOUND);
  //   }
  //   res.setHeader('Content-Type', 'video/mp4');
  //   stream.pipe(res);
  // }
}
