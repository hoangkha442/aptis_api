import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSpeakingTestDto, CreateSpeakingQuestionDto } from './dto/create-speaking.dto';

@Injectable()
export class SpeakingService {
  prisma = new PrismaClient();

  async getAllSpeakingKeys(user_id: number) {
    const user = await this.prisma.users.findUnique({ where: { user_id } });
    if (!user) throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);

    return this.prisma.speaking_tests.findMany();
  }

  async getSpeakingById(user_id: number, speaking_test_id: number) {
    const user = await this.prisma.users.findUnique({ where: { user_id } });
    if (!user) throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);

    const test = await this.prisma.speaking_tests.findUnique({
      where: { id: speaking_test_id },
      include: { questions: true },
    });

    if (!test) throw new HttpException('Không tìm thấy bài nói', HttpStatus.NOT_FOUND);

    const grouped = test.questions.reduce((acc, question) => {
      const key = `Part ${question.part_number}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(question);
      return acc;
    }, {} as Record<string, typeof test.questions>);

    return { ...test, questions: grouped };
  }

  async createSpeakingTest(data: CreateSpeakingTestDto) {
    return this.prisma.speaking_tests.create({ data });
  }

  async createSpeakingQuestion(data: CreateSpeakingQuestionDto) {
    return this.prisma.speaking_questions.create({ data });
  }

  async updateSpeakingTest(id: number, data: CreateSpeakingTestDto) {
    return this.prisma.speaking_tests.update({ where: { id }, data });
  }

  async updateSpeakingQuestion(id: number, data: CreateSpeakingQuestionDto) {
    return this.prisma.speaking_questions.update({ where: { id }, data });
  }

  async deleteSpeakingQuestion(id: number) {
    return this.prisma.speaking_questions.delete({ where: { id } });
  }
}
