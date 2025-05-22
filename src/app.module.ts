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
import { UserSessionsModule } from './user-sessions/user-sessions.module';
import { CourseMembersModule } from './course-members/course-members.module';
import { CourseModule } from './course/course.module';
import { WritingModule } from './writing/writing.module';

@Module({
  imports: [UserModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReadingModule,
    ListeningModule,
    UserSessionsModule,
    CourseMembersModule,
    CourseModule,
    WritingModule,
  ],
  controllers: [AppController, InitDbController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
