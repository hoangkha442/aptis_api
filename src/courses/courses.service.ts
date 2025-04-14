import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  private prisma = new PrismaClient();

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.courses.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    return this.prisma.courses.findMany({
      include: {
        users: true, 
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.courses.findUnique({
      where: { course_id: id },
      include: {
        users: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.courses.update({
      where: { course_id: id },
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    return this.prisma.courses.delete({
      where: { course_id: id },
    });
  }

  async getUserByCourseId(courseId: number) {
    const course = await this.prisma.courses.findUnique({
      where: { course_id: courseId },
      include: { users: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.users;
  }
}
