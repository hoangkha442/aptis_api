import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from 'src/interfaces';

@Injectable()
export class ReadingService {
  prisma = new PrismaClient();
  
  async getAll(user_id: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id },
    });
    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }
    const getAllReading = await this.prisma.reading_test.findMany()
    return getAllReading
  }

  async findReadingDependOnID(user_id: number, reading_test_id: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id },
    });
  
    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }
  
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
  
    if (!readingTest) {
      throw new HttpException('Không tìm thấy bài đọc', HttpStatus.NOT_FOUND);
    }
    return readingTest;
  }
  


}
