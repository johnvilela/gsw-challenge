import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { Account } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string) {
    return this.prisma.account.create({
      data: {
        userId,
      },
    });
  }

  async update(id: string, data: Partial<Account>) {
    return this.prisma.account.update({
      where: { id },
      data,
    });
  }

  async findByUser(userId: string) {
    return this.prisma.account.findUnique({
      where: { userId },
      select: {
        movements: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
