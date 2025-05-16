import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users } from '@prisma/client';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as useragent from 'useragent';
@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  async login(bodyLogin: bodyLogin, req: any) {
    const getUser = await this.prisma.users.findUnique({
      where: { email: bodyLogin.email },
    });

    if (!getUser) {
      throw new HttpException('Sai email!', HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatching = await bcrypt.compare(
      bodyLogin.password,
      getUser.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Sai mật khẩu!', HttpStatus.BAD_REQUEST);
    }

    if (getUser.status !== 'active') {
      throw new HttpException(
        'Tài khoản không hoạt động',
        HttpStatus.FORBIDDEN,
      );
    }

    // Lấy IP và thiết bị hiện tại
    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const agent = useragent.parse(req.headers['user-agent']);
    const device = `${agent.os.toString()} - ${agent.toAgent()}`;

    // Kiểm tra xem session này (ip + device) đã tồn tại chưa
    const existingSameSession = await this.prisma.user_sessions.findFirst({
      where: {
        user_id: getUser.user_id,
        ip_address: ip,
        device: device,
      },
    });

    if (!existingSameSession) {
      // Đếm tổng số thiết bị khác nhau
      const existingSessions = await this.prisma.user_sessions.findMany({
        where: { user_id: getUser.user_id },
        orderBy: { created_at: 'asc' },
      });

      if (existingSessions.length >= 3) {
        // Nếu > 3 thiết bị khác → khóa tài khoản
        await this.prisma.users.update({
          where: { user_id: getUser.user_id },
          data: { status: 'inactive' },
        });

        throw new HttpException(
          'Tài khoản bị khóa do đăng nhập quá số thiết bị cho phép.',
          HttpStatus.FORBIDDEN,
        );
      }

      // Tạo session mới
      const sessionToken = uuidv4();
      const expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 ngày

      await this.prisma.user_sessions.create({
        data: {
          session_id: sessionToken,
          user_id: getUser.user_id,
          token: sessionToken,
          ip_address: ip,
          device: device,
          expires_at: expiresAt,
        },
      });
    }

    // Trả về JWT Token luôn (dù tạo session mới hay đã tồn tại)
    const jwtToken = await this.jwtService.signAsync(
      { data: { user_id: getUser.user_id } },
      { expiresIn: '10d', secret: 'KHONG_CO_KHOA' },
    );

    return {
      token: jwtToken,
      role: getUser.role,
    };
  }

  async getMyInfo(requestingUserID: number): Promise<users> {
    const user = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      include: { user_sessions: true },
    });
    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }
    if (user.status !== 'active') {
      throw new HttpException(
        'Tài khoản không hoạt động',
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }

  async signup(@Body() bodySignup: BodySignup) {
    const checkEmail = await this.prisma.users.findUnique({
      where: { email: bodySignup.email },
    });

    if (!checkEmail) {
      const newPassword = await bcrypt.hash(bodySignup.password, 10);
      const userRole = bodySignup.role ?? 'student';
      const username = bodySignup.email.split('@')[0];

      try {
        const newUser = await this.prisma.users.create({
          data: {
            user_name: username,
            email: bodySignup.email,
            password: newPassword,
            full_name: bodySignup.full_name,
            phone_number: bodySignup.phone_number,
            role: userRole,
            status: 'active',
            create_at: new Date(),
            last_day: bodySignup.last_day,
          },
        });

        return newUser;
      } catch (error) {
        throw new HttpException(
          'Lỗi khi tạo người dùng, vui lòng thử lại!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Email đã tồn tại!', HttpStatus.BAD_REQUEST);
    }
  }
}
