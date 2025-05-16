import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users } from '@prisma/client';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import * as useragent from 'useragent';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private readonly jwtService: JwtService) {}

  private getClientInfo(req: any) {
    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress;
    const agent = useragent.parse(req.headers['user-agent']);
    const device = `${agent.os.toString()} - ${agent.toAgent()}`;
    return { ip, device };
  }

  private async checkOrCreateSession(userId: number, ip: string, device: string) {
    const existingSession = await this.prisma.user_sessions.findFirst({
      where: { user_id: userId, ip_address: ip, device },
    });

    if (!existingSession) {
      const sessions = await this.prisma.user_sessions.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'asc' },
      });

      if (sessions.length >= 3) {
        await this.prisma.users.update({
          where: { user_id: userId },
          data: { status: 'inactive' },
        });
        throw new HttpException(
          'Tài khoản bị khóa do đăng nhập quá số thiết bị cho phép.',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.prisma.user_sessions.create({
        data: {
          session_id: uuidv4(),
          user_id: userId,
          token: uuidv4(),
          ip_address: ip,
          device,
          expires_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
        },
      });
    }
  }

  async login({ email, password }: bodyLogin, req: any) {
    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user) throw new HttpException('Sai email!', HttpStatus.BAD_REQUEST);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpException('Sai mật khẩu!', HttpStatus.BAD_REQUEST);

    if (user.status !== 'active') {
      throw new HttpException('Tài khoản không hoạt động', HttpStatus.FORBIDDEN);
    }

    const { ip, device } = this.getClientInfo(req);
    await this.checkOrCreateSession(user.user_id, ip, device);

    const token = await this.jwtService.signAsync(
      { data: { user_id: user.user_id } },
      { expiresIn: '10d', secret: 'KHONG_CO_KHOA' },
    );

    return { token, role: user.role };
  }

  async getMyInfo(userId: number, req: any): Promise<users> {
    const { ip, device } = this.getClientInfo(req);

    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      include: { user_sessions: true },
    });

    if (!user) throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    if (user.status !== 'active') {
      throw new HttpException('Tài khoản không hoạt động', HttpStatus.FORBIDDEN);
    }

    await this.checkOrCreateSession(userId, ip, device);
    return user;
  }

  async signup(body: BodySignup) {
    const { email, password, full_name, phone_number, role, last_day } = body;
    const existingUser = await this.prisma.users.findUnique({ where: { email } });

    if (existingUser) {
      throw new HttpException('Email đã tồn tại!', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userName = email.split('@')[0];
    const userRole = role ?? 'student';

    try {
      return await this.prisma.users.create({
        data: {
          user_name: userName,
          email,
          password: hashedPassword,
          full_name,
          phone_number,
          role: userRole,
          status: 'active',
          create_at: new Date(),
          last_day,
        },
      });
    } catch {
      throw new HttpException('Lỗi khi tạo người dùng, vui lòng thử lại!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
