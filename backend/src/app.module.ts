import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [UserModule, AccountModule],
  providers: [PrismaService],
})
export class AppModule {}
