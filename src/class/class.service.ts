import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClassService {
  prisma = new PrismaClient();

  async getClassStatistics(userID: number, page: number, limit: number) {
    const getRoleUserData = await this.prisma.users.findUnique({
      where: { user_id: userID }
    });

    if (!getRoleUserData || getRoleUserData.role !== "instructor") {
      throw new Error('Không có quyền truy cập!');
    }

    const totalClasses = await this.prisma.classes.count();

    const upcomingClosingClasses = await this.prisma.classes.count({
      where: {
        end_date: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 7))
        }
      }
    });

    const completedClasses = await this.prisma.classes.count({
      where: {
        end_date: {
          lt: new Date()
        }
      }
    });

    // Xử lý pagination
    const skip = (page - 1) * limit;
    const classDetails = await this.prisma.classes.findMany({
      skip: skip,
      take: limit,
      select: {
        class_id: true,
        class_name: true,
        max_students: true,
        completed_sessions: true,
        participation_rate: true,
        homework_submission_rate: true
      }
    });

    // Đếm tổng số lớp học để hỗ trợ pagination
    const totalRecords = await this.prisma.classes.count();

    return {
      totalClasses,
      upcomingClosingClasses,
      completedClasses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords: totalRecords,
        pageSize: limit
      },
      classDetails
    };
  }
}
