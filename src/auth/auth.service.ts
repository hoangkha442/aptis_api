import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users } from '@prisma/client';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    prisma = new PrismaClient();

    constructor(private jwtService: JwtService) {}

    async login(bodyLogin: bodyLogin) { 
        const getUser = await this.prisma.users.findUnique({
            where: { email: bodyLogin.email }
        });

        if (!getUser) {
            throw new HttpException('Sai email!', HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra mật khẩu
        const isPasswordMatching = await bcrypt.compare(bodyLogin.password, getUser.password_hash);
        if (!isPasswordMatching) {
            throw new HttpException("Sai mật khẩu!", HttpStatus.BAD_REQUEST);
        }
        try {
            const token = await this.jwtService.signAsync(
                { data: { user_id: getUser.user_id } }, 
                { expiresIn: "10d", secret: "KHONG_CO_KHOA" }
            );

            return { token: token, role: getUser.role };
        } catch (error) {
            throw new HttpException('Lỗi khi tạo token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async getMyInfo(requestingUserID: number): Promise<users> {
        const user = await this.prisma.users.findUnique({
          where: { user_id: requestingUserID },
        });
        if (!user) {
          throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
        }
        return user;
      }

    async signup(@Body() bodySignup: BodySignup) {
        const checkEmail = await this.prisma.users.findUnique({
            where: { email: bodySignup.email }
        });

        if (!checkEmail) {
            const newPassword = await bcrypt.hash(bodySignup.password, 10);
            const userRole = bodySignup.role ?? 'student';
            const username = bodySignup.email.split('@')[0];

            try {
                const newUser = await this.prisma.users.create({
                    data: {
                        username: username,
                        email: bodySignup.email,
                        password_hash: newPassword,
                        full_name: bodySignup.full_name,
                        phone_number: bodySignup.phone_number,
                        role: userRole,
                        status: 'inactive',
                        created_at: new Date(),
                        profile_image: bodySignup.profile_image,
                    }
                });

                return newUser;
            } catch (error) {
                throw new HttpException('Lỗi khi tạo người dùng, vui lòng thử lại!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException('Email đã tồn tại!', HttpStatus.BAD_REQUEST);
        }
    }
}
