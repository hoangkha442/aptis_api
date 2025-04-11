import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();


  async getAllUsers() {
    return await this.prisma.users.findMany();
  }

  async getUserById(userId: number) {
    return await this.prisma.users.findUnique({
      where: { user_id: userId },
    });
  }

  async updateUser(userId: number, userData: Partial<any>) {
    return await this.prisma.users.update({
      where: { user_id: userId },
      data: userData,
    });
  }

  async deleteUser(userId: number) {
    return await this.prisma.users.delete({
      where: { user_id: userId },
    });
  }


}
