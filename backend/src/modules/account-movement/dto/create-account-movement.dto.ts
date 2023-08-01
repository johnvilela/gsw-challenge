import { ApiProperty } from '@nestjs/swagger';
import { ACCOUNT_MOVEMENT_TYPE } from '@prisma/client';

export type Banknotes = { [key in '100' | '50' | '20' | '10']?: number };

export class CreateAccountMovementDTO {
  @ApiProperty()
  value: number;

  @ApiProperty({
    enum: ACCOUNT_MOVEMENT_TYPE,
  })
  movementType: ACCOUNT_MOVEMENT_TYPE;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  banknotes?: Banknotes;
}

export type AccountMovementResponse = Omit<
  CreateAccountMovementDTO,
  'accountId'
>;
