import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  providers: [AccountService, PrismaService],
  controllers: [AccountController],
})
export class AccountModule {}
