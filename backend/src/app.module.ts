import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { AccountMovementModule } from './modules/account-movement/account-movement.module';

@Module({
  imports: [UserModule, AccountModule, AccountMovementModule],
  providers: [PrismaService],
})
export class AppModule {}
