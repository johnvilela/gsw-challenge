import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AccountMovementResponse,
  Banknotes,
  CreateAccountMovementDTO,
} from './dto/create-account-movement.dto';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ACCOUNT_MOVEMENT_TYPE } from '@prisma/client';

@Injectable()
export class AccountMovementService {
  constructor(private prismaService: PrismaService) {}

  private calculateBanknotes(value: number, banknotes: Banknotes) {
    const availableBanknotes = Object.entries(banknotes).map(
      ([value, count]) => ({ value: parseInt(value), count }),
    );
    availableBanknotes.sort((a, b) => b.value - a.value);

    const result: { [key: string]: number } = {};
    for (const banknote of availableBanknotes) {
      const count = Math.min(
        Math.floor(value / banknote.value),
        banknote.count,
      );
      if (count > 0) {
        result[banknote.value.toString()] = count;
        value -= count * banknote.value;
      }
    }

    if (value > 0) {
      throw new BadRequestException(
        `We does not have enough banknotes to complete the operation.`,
      );
    }

    return result;
  }

  async create({
    accountId,
    banknotes,
    movementType,
    value,
  }: CreateAccountMovementDTO): Promise<AccountMovementResponse> {
    if (!accountId) throw new BadRequestException('Account id is required');

    if (value <= 0)
      throw new BadRequestException('Value must be greater than 0');

    const account = await this.prismaService.account.findUnique({
      where: { id: accountId },
    });

    if (!account) throw new BadRequestException('Account not found');

    if (!Object.values(ACCOUNT_MOVEMENT_TYPE).includes(movementType)) {
      throw new BadRequestException('Movement type is invalid');
    }

    let newValue = 0;

    if (movementType === ACCOUNT_MOVEMENT_TYPE.DEPOSIT) {
      newValue = account.totalValue + value;
    }

    let result: { [key: string]: number } = {};

    if (movementType === ACCOUNT_MOVEMENT_TYPE.WITHDRAW) {
      if (!banknotes)
        throw new BadRequestException('Banknotes is required to withdraw');

      if (account.totalValue - value <= 0)
        throw new BadRequestException('Insufficient funds');

      result = this.calculateBanknotes(value, banknotes);

      newValue = account.totalValue - value;
    }

    await this.prismaService.account.update({
      where: { id: accountId },
      data: {
        totalValue: newValue,
        movements: {
          create: {
            movementType,
            value,
          },
        },
      },
    });

    return {
      movementType,
      value,
      banknotes: result as Banknotes,
    };
  }
}
