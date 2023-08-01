import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        ...data,
        account: {
          create: {
            totalValue: 10000,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        account: {
          include: {
            movements: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
