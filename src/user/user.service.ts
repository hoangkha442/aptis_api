import { Injectable } from '@nestjs/common';
import { PrismaClient, users } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async getAllUsers() {
    return this.prisma.users.findMany({
      include: {
        user_sessions: true,
        course_members: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  async getUserById(userId: number) {
    return this.prisma.users.findUnique({
      where: { user_id: userId },
    });
  }

  // ✅ Tạo người dùng có bcrypt hash mật khẩu
  async createUser(userData: CreateUserDto) {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    return this.prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword, // 🔐 dùng hash
      },
    });
  }

  async updateUser(userId: number, userData: Partial<users>) {
    const existingUser = await this.prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!existingUser) throw new Error('User not found');

    let updatedData = { ...userData };

    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(userData.password, salt);
    } else {
      updatedData.password = existingUser.password;
    }

    return this.prisma.users.update({
      where: { user_id: userId },
      data: updatedData,
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.users.delete({
      where: { user_id: userId },
    });
  }
}
