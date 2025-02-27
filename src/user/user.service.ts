import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  // ✅ API: Thống kê học viên (Statistics)
  async getUserStatistics(userID: number) {
    const getRoleUserData = await this.prisma.users.findUnique({
      where: { user_id: userID }
    });

    if (!getRoleUserData || getRoleUserData.role === "student") {
      throw new Error('Không có quyền truy cập!');
    }

    // Tổng số học viên
    const totalStudents = await this.prisma.students.count();

    // Học viên sắp học xong (có `end_learning_date` trong 30 ngày tới)
    const graduatingStudents = await this.prisma.students.count({
      where: {
        end_learning_date: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 30))
        }
      }
    });

    // Độ tuổi học viên
    const ageDistribution = await this.prisma.students.groupBy({
      by: ['date_of_birth'],
      _count: { student_id: true }
    });

    // Tỉ lệ nhu cầu học (số lượng học viên mới qua từng tháng)
    const newStudentsData = await this.prisma.students.groupBy({
      by: ['enrollment_date'],
      _count: { student_id: true }
    });

    // Tỉ lệ học viên từ nguồn
    const sourceDistribution = await this.prisma.users.groupBy({
      by: ['source'],
      _count: { user_id: true }
    });

    return {
      totalStudents,
      graduatingStudents,
      ageDistribution,
      newStudentsData,
      sourceDistribution
    };
  }

  // ✅ API: Lấy danh sách người dùng
  async getAllUsers() {
    return await this.prisma.users.findMany();
  }

  // ✅ API: Lấy thông tin người dùng theo ID
  async getUserById(userId: number) {
    return await this.prisma.users.findUnique({
      where: { user_id: userId },
    });
  }

  // ✅ API: Cập nhật thông tin người dùng
  async updateUser(userId: number, userData: Partial<any>) {
    return await this.prisma.users.update({
      where: { user_id: userId },
      data: userData,
    });
  }

  // ✅ API: Xóa người dùng
  async deleteUser(userId: number) {
    return await this.prisma.users.delete({
      where: { user_id: userId },
    });
  }

  // ✅ API: Lấy danh sách học viên
  async getStudents() {
    return await this.prisma.students.findMany();
  }
}
