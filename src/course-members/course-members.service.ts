import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCourseMemberDto } from './dto/create-course-member.dto';
import { UpdateCourseMemberDto } from './dto/update-course-member.dto';

@Injectable()
export class CourseMembersService {
  prisma = new PrismaClient();

  async create(dto: CreateCourseMemberDto) {
    const existing = await this.prisma.course_members.findUnique({
      where: {
        user_id_course_id: {
          user_id: dto.user_id,
          course_id: dto.course_id,
        },
      },
    });

    if (existing) {
      throw new HttpException('Thành viên đã tồn tại trong khóa học', HttpStatus.CONFLICT);
    }

    return await this.prisma.course_members.create({
      data: {
        user_id: dto.user_id,
        course_id: dto.course_id,
        role: dto.role,
      },
    });
  }

  async findAll() {
    return await this.prisma.course_members.findMany({
      include: {
        user: true,
        course: true,
      },
    });
  }

  async findOne(id: number) {
    const member = await this.prisma.course_members.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });

    if (!member) {
      throw new HttpException('Không tìm thấy thành viên', HttpStatus.NOT_FOUND);
    }

    return member;
  }

  async update(id: number, dto: UpdateCourseMemberDto) {
    const member = await this.prisma.course_members.findUnique({ where: { id } });

    if (!member) {
      throw new HttpException('Không tìm thấy thành viên', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.course_members.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const member = await this.prisma.course_members.findUnique({ where: { id } });

    if (!member) {
      throw new HttpException('Không tìm thấy thành viên', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.course_members.delete({ where: { id } });
  }
}
