import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateWritingQuestionDto, CreateWritingTestDto } from 'src/writing/dto/create-writing.dto';



@Injectable()
export class WritingService {
  prisma = new PrismaClient();

  async getAllWritingTests() {
    return this.prisma.writing_tests.findMany();
  }

  async getWritingById(writing_test_id: number) {
    const test = await this.prisma.writing_tests.findUnique({
      where: { id: writing_test_id },
      include: { questions: true },
    });

    if (!test) {
      throw new HttpException('Không tìm thấy đề viết', HttpStatus.NOT_FOUND);
    }

    const grouped = test.questions.reduce((acc, item) => {
      const part = `Part ${item.part_number}`;
      if (!acc[part]) acc[part] = [];
      acc[part].push(item);
      return acc;
    }, {});

    return { ...test, grouped_questions: grouped };
  }

  async createWritingTest(data: CreateWritingTestDto) {
    return this.prisma.writing_tests.create({ data });
  }

  async createWritingQuestion(data: CreateWritingQuestionDto) {
    return this.prisma.writing_questions.create({ data });
  }

  async updateWritingTest(id: number, data: CreateWritingTestDto) {
    const test = await this.prisma.writing_tests.findUnique({ where: { id } });
    if (!test) throw new HttpException('Không tìm thấy đề viết', HttpStatus.NOT_FOUND);

    return this.prisma.writing_tests.update({ where: { id }, data });
  }

  async updateWritingQuestion(id: number, data: CreateWritingQuestionDto) {
    const q = await this.prisma.writing_questions.findUnique({ where: { id } });
    if (!q) throw new HttpException('Không tìm thấy câu hỏi', HttpStatus.NOT_FOUND);

    return this.prisma.writing_questions.update({ where: { id }, data });
  }

  async deleteWritingQuestion(id: number) {
    const q = await this.prisma.writing_questions.findUnique({ where: { id } });
    if (!q) throw new HttpException('Không tìm thấy câu hỏi', HttpStatus.NOT_FOUND);

    return this.prisma.writing_questions.delete({ where: { id } });
  }
}