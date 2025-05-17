import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  prisma = new PrismaClient();

  async create(admin_id: number, createCourseDto: CreateCourseDto) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: admin_id },
    });

    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }

    if (user.role === 'student') {
      throw new HttpException('Không có quyền tạo khóa học', HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.courses.create({
      data: {
        course_name: createCourseDto.course_name,
        description: createCourseDto.description,
        members: {
          create: {
            user_id: admin_id,
            role: user.role ?? 'student', 
          },
        },
      },
    });
  }

  async findAll(user_id: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }

    if (user.role === 'student') {
      throw new HttpException('Không có quyền truy cập', HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.courses.findMany({
      include: {
        members: true,
      },
    });
  }

  async findOne(user_id: number, course_id: number) {
    const course = await this.prisma.courses.findUnique({
      where: { course_id },
      include: { members: true },
    });

    if (!course) {
      throw new HttpException('Không tìm thấy khóa học', HttpStatus.NOT_FOUND);
    }

    const isMember = await this.prisma.course_members.findUnique({
      where: {
        user_id_course_id: {
          user_id,
          course_id,
        },
      },
    });

    if (!isMember) {
      throw new HttpException('Không có quyền truy cập khóa học này', HttpStatus.UNAUTHORIZED);
    }

    return course;
  }

  async update(user_id: number, course_id: number, dto: UpdateCourseDto) {
    const user = await this.prisma.users.findUnique({ where: { user_id } });

    if (!user || user.role === 'student') {
      throw new HttpException('Không có quyền cập nhật', HttpStatus.UNAUTHORIZED);
    }

    const course = await this.prisma.courses.findUnique({ where: { course_id } });

    if (!course) {
      throw new HttpException('Không tìm thấy khóa học', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.courses.update({
      where: { course_id },
      data: dto,
    });
  }

  async remove(user_id: number, course_id: number) {
    const user = await this.prisma.users.findUnique({ where: { user_id } });

    if (!user || user.role !== 'admin') {
      throw new HttpException('Chỉ admin mới được xóa khóa học', HttpStatus.UNAUTHORIZED);
    }

    const course = await this.prisma.courses.findUnique({ where: { course_id } });

    if (!course) {
      throw new HttpException('Không tìm thấy khóa học', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.courses.delete({
      where: { course_id },
    });
  }
}
