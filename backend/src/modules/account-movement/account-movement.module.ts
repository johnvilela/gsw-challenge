import { Module } from '@nestjs/common';
import { AccountMovementController } from './account-movement.controller';
import { AccountMovementService } from './account-movement.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  controllers: [AccountMovementController],
  providers: [AccountMovementService, PrismaService],
})
export class AccountMovementModule {}
