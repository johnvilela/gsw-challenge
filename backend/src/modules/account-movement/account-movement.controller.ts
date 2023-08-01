import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountMovementService } from './account-movement.service';
import { CreateAccountMovementDTO } from './dto/create-account-movement.dto';

@ApiTags('Account Movement')
@Controller('account-movement')
export class AccountMovementController {
  constructor(
    private readonly accountMovementService: AccountMovementService,
  ) {}

  @ApiOperation({ summary: 'Create a new account movement' })
  @ApiResponse({
    status: 201,
    description: 'The created account movement',
  })
  @ApiBadRequestResponse({
    description: 'Value must be greater than 0',
  })
  @ApiBearerAuth()
  @Post()
  async createMovement(@Body() data: CreateAccountMovementDTO) {
    return this.accountMovementService.create(data);
  }
}
