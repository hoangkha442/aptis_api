import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { groupBy } from 'lodash';
import {
  CreateListeningItemDto,
  CreateListeningTestDto,
} from 'src/listening/dto/create-listening.dto';
@Injectable()
export class ListeningService {
  prisma = new PrismaClient();

  async getAllListeningKeys(user_id: number) {
    const user = await this.prisma.users.findUnique({ where: { user_id } });
    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }

    const allListeningTests = await this.prisma.listening_test.findMany();
    return allListeningTests;
  }

  async getListeningById(user_id: number, listening_test_id: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }

    const test = await this.prisma.listening_test.findUnique({
      where: { listening_test_id },
      include: {
        listening_test_items: true,
      },
    });

    if (!test) {
      throw new HttpException('Không tìm thấy bài nghe', HttpStatus.NOT_FOUND);
    }

    const groupedItems: { [key: string]: typeof test.listening_test_items } =
      {};

    for (const item of test.listening_test_items) {
      let groupKey = item.question_number ?? 'Unknown';

      const match = groupKey.match(/Question (\d+)/);
      if (match) {
        groupKey = `Question ${match[1]}`;
      }

      if (!groupedItems[groupKey]) {
        groupedItems[groupKey] = [];
      }
      groupedItems[groupKey].push(item);
    }

    return {
      ...test,
      listening_test_items: groupedItems,
    };
  }

  async createListeningTest(data: CreateListeningTestDto) {
    return this.prisma.listening_test.create({ data });
  }

  async createListeningItem(data: CreateListeningItemDto) {
    return this.prisma.listening_test_items.create({ data });
  }

  async updateListeningTest(
    listening_test_id: number,
    data: CreateListeningTestDto,
  ) {
    const existingTest = await this.prisma.listening_test.findUnique({
      where: { listening_test_id },
    });

    if (!existingTest) {
      throw new HttpException('Không tìm thấy bài nghe', HttpStatus.NOT_FOUND);
    }

    return this.prisma.listening_test.update({
      where: { listening_test_id },
      data,
    });
  }

  async updateListeningItem(
    listening_test_items_id: number,
    data: CreateListeningItemDto,
  ) {
    const existingItem = await this.prisma.listening_test_items.findUnique({
      where: { listening_test_items_id },
    });

    if (!existingItem) {
      throw new HttpException('Không tìm thấy câu hỏi', HttpStatus.NOT_FOUND);
    }

    return this.prisma.listening_test_items.update({
      where: { listening_test_items_id },
      data,
    });
  }
  async deleteListeningItem(listening_test_items_id: number) {
    const existingItem = await this.prisma.listening_test_items.findUnique({
      where: { listening_test_items_id },
    });

    if (!existingItem) {
      throw new HttpException('Không tìm thấy câu hỏi', HttpStatus.NOT_FOUND);
    }

    return this.prisma.listening_test_items.delete({
      where: { listening_test_items_id },
    });
  }
}
