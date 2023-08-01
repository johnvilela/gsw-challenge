import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':userId')
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiOkResponse({ description: 'Accounts found' })
  async findByUser(@Param('userId') userId: string) {
    return this.accountService.findByUser(userId);
  }
}
