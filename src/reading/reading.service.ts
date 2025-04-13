import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReadingTestDto } from './dto/create-reading-test.dto';
import { CreateReadingPart1Dto } from './dto/create-reading-part1.dto';
import { CreateReadingPart2Dto } from './dto/create-reading-part2.dto';
import { CreateReadingPart3Dto } from './dto/create-reading-part3.dto';
import { CreateReadingPart4Dto } from './dto/create-reading-part4.dto';
import { CreateReadingPart5Dto } from './dto/create-reading-part5.dto';

@Injectable()
export class ReadingService {
  prisma = new PrismaClient();

  async getAll(user_id: number) {
    const user = await this.prisma.users.findUnique({ where: { user_id } });
    if (!user) throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    return this.prisma.reading_test.findMany();
  }

  async findReadingDependOnID(user_id: number, reading_test_id: number) {
    const user = await this.prisma.users.findUnique({ where: { user_id } });
    if (!user) throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);

    const readingTest = await this.prisma.reading_test.findUnique({
      where: { reading_test_id },
      include: {
        reading_part_1: true,
        reading_part_2: true,
        reading_part_3: true,
        reading_part_4: true,
        reading_part_5: true,
      },
    });

    if (!readingTest) throw new HttpException('Không tìm thấy bài đọc', HttpStatus.NOT_FOUND);
    return readingTest;
  }

  async createReadingTest(dto: CreateReadingTestDto) {
    return this.prisma.reading_test.create({ data: dto });
  }

  async createReadingPart1(dto: CreateReadingPart1Dto) {
    return this.prisma.reading_part_1.create({ data: dto });
  }

  async createReadingPart2(dto: CreateReadingPart2Dto) {
    return this.prisma.reading_part_2.create({ data: dto });
  }

  async createReadingPart3(dto: CreateReadingPart3Dto) {
    return this.prisma.reading_part_3.create({ data: dto });
  }

  async createReadingPart4(dto: CreateReadingPart4Dto) {
    return this.prisma.reading_part_4.create({ data: dto });
  }

  async createReadingPart5(dto: CreateReadingPart5Dto) {
    return this.prisma.reading_part_5.create({ data: dto });
  }
  // Sửa
async updateReadingPart1(id: number, dto: CreateReadingPart1Dto) {
  return this.prisma.reading_part_1.update({ where: { reading_part_1_id: id }, data: dto });
}
async updateReadingPart2(id: number, dto: CreateReadingPart2Dto) {
  return this.prisma.reading_part_2.update({ where: { reading_part_2_id: id }, data: dto });
}
async updateReadingPart3(id: number, dto: CreateReadingPart3Dto) {
  return this.prisma.reading_part_3.update({ where: { reading_part_3_id: id }, data: dto });
}
async updateReadingPart4(id: number, dto: CreateReadingPart4Dto) {
  return this.prisma.reading_part_4.update({ where: { reading_part_4_id: id }, data: dto });
}
async updateReadingPart5(id: number, dto: CreateReadingPart5Dto) {
  return this.prisma.reading_part_5.update({ where: { reading_part_5_id: id }, data: dto });
}

// Xoá
async deleteReadingPart1(id: number) {
  return this.prisma.reading_part_1.delete({ where: { reading_part_1_id: id } });
}
async deleteReadingPart2(id: number) {
  return this.prisma.reading_part_2.delete({ where: { reading_part_2_id: id } });
}
async deleteReadingPart3(id: number) {
  return this.prisma.reading_part_3.delete({ where: { reading_part_3_id: id } });
}
async deleteReadingPart4(id: number) {
  return this.prisma.reading_part_4.delete({ where: { reading_part_4_id: id } });
}
async deleteReadingPart5(id: number) {
  return this.prisma.reading_part_5.delete({ where: { reading_part_5_id: id } });
}

}