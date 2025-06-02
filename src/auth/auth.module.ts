import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleDriveService } from 'src/auth/google-drive.service';

@Module({
  imports: [ JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,  GoogleDriveService],
})
export class AuthModule {}
