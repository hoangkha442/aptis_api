import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserSessionsService {
  prisma = new PrismaClient();
  async findByUser(user_id: number, admin_id: number) {
    // Kiểm tra người gọi API có phải là admin không
    const admin = await this.prisma.users.findUnique({
      where: { user_id: admin_id },
    });
    console.log('admin: ', admin);

    if (!admin || admin.role !== 'admin') {
      throw new ForbiddenException('Không có quyền truy cập.');
    }

    // Nếu là admin, trả về danh sách session của user_id
    return await this.prisma.user_sessions.findMany({
      where: { user_id: user_id * 1 },
      orderBy: { created_at: 'desc' },
    });
  }

  async removeBySession(session_id: string, admin_id: number) {
    const admin = await this.prisma.users.findUnique({
      where: { user_id: admin_id },
    });
    console.log('admin: ', admin);

    if (!admin || admin.role !== 'admin') {
      throw new ForbiddenException('Không có quyền truy cập.');
    }
    const session = await this.prisma.user_sessions.findUnique({
      where: { session_id },
    });
    if (!session) {
      throw new NotFoundException('Session không tồn tại.');
    }
    return this.prisma.user_sessions.delete({
      where: { session_id },
    });
  }
}
