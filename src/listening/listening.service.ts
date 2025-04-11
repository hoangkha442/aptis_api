import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { groupBy } from 'lodash'; 
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
  
    const groupedItems: { [key: string]: typeof test.listening_test_items } = {};

    
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
      listening_test_items: groupedItems
    };
  }
}
