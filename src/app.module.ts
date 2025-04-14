import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { ReadingModule } from './reading/reading.module';
import { ListeningModule } from './listening/listening.module';
import { InitDbController } from 'src/init-db/init-db.controller';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UserModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReadingModule,
    ListeningModule,
    CoursesModule,
  ],
  controllers: [AppController, InitDbController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
