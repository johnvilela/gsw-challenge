import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { AccountMovementService } from './account-movement.service';
import { Banknotes } from './dto/create-account-movement.dto';
import { ACCOUNT_MOVEMENT_TYPE, Account } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

describe('AccountMovementService', () => {
  let service: AccountMovementService;
  let prismaService: PrismaService;

  const accountId = '64c8a41daa55f620efc99676';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountMovementService, PrismaService],
    }).compile();

    service = module.get<AccountMovementService>(AccountMovementService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createMovement', () => {
    it('should create a deposit movement and update the account total value', async () => {
      const value = 100;
      const movementType = ACCOUNT_MOVEMENT_TYPE.DEPOSIT;

      const account = {
        id: accountId,
        totalValue: 0,
      };

      jest
        .spyOn(prismaService.account, 'findUnique')
        .mockResolvedValue(account as Account);
      jest
        .spyOn(prismaService.account, 'update')
        .mockResolvedValue(account as Account);

      const result = await service.create({
        accountId,
        value,
        movementType,
      });

      expect(result).toEqual({
        movementType,
        value,
        banknotes: {},
      });
      expect(prismaService.account.findUnique).toHaveBeenCalledWith({
        where: { id: accountId },
      });
      expect(prismaService.account.update).toHaveBeenCalledWith({
        where: { id: accountId },
        data: {
          totalValue: value,
          movements: {
            create: {
              movementType,
              value,
            },
          },
        },
      });
    });

    it('should create a withdraw movement and update the account total value and banknotes', async () => {
      const value = 100;
      const movementType = ACCOUNT_MOVEMENT_TYPE.WITHDRAW;
      const banknotes: Banknotes = {
        100: 1,
        50: 1,
        20: 1,
        10: 1,
      };

      const account = {
        id: accountId,
        totalValue: 200,
      };

      jest
        .spyOn(prismaService.account, 'findUnique')
        .mockResolvedValue(account as Account);
      jest
        .spyOn(prismaService.account, 'update')
        .mockResolvedValue(account as Account);

      const result = await service.create({
        accountId,
        value,
        movementType,
        banknotes,
      });

      expect(result).toEqual({
        movementType,
        value,
        banknotes: {
          100: 1,
        },
      });
      expect(prismaService.account.findUnique).toHaveBeenCalledWith({
        where: { id: accountId },
      });
      expect(prismaService.account.update).toHaveBeenCalledWith({
        where: { id: accountId },
        data: {
          totalValue: 100,
          movements: {
            create: {
              movementType,
              value,
            },
          },
        },
      });
    });

    it('should throw a BadRequestException if the account id is not provided', async () => {
      const value = 100;
      const movementType = ACCOUNT_MOVEMENT_TYPE.DEPOSIT;

      await expect(
        service.create({ value, movementType, accountId: null }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the value is not greater than 0', async () => {
      const value = 0;
      const movementType = ACCOUNT_MOVEMENT_TYPE.DEPOSIT;

      await expect(
        service.create({ accountId, value, movementType }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the account is not found', async () => {
      const value = 100;
      const movementType = ACCOUNT_MOVEMENT_TYPE.DEPOSIT;

      jest.spyOn(prismaService.account, 'findUnique').mockResolvedValue(null);

      await expect(
        service.create({ accountId, value, movementType }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the movement type is invalid', async () => {
      const value = 100;
      const movementType = 'invalid' as ACCOUNT_MOVEMENT_TYPE;

      const account = {
        id: accountId,
        totalValue: 0,
      };

      jest
        .spyOn(prismaService.account, 'findUnique')
        .mockResolvedValue(account as Account);

      await expect(
        service.create({ accountId, value, movementType }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the banknotes are not provided for a withdraw', async () => {
      const value = 100;
      const movementType = ACCOUNT_MOVEMENT_TYPE.WITHDRAW;

      const account = {
        id: accountId,
        totalValue: 200,
      };

      jest
        .spyOn(prismaService.account, 'findUnique')
        .mockResolvedValue(account as Account);

      await expect(
        service.create({ accountId, value, movementType }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the account does not have enough funds for a withdraw', async () => {
      const value = 300;
      const movementType = ACCOUNT_MOVEMENT_TYPE.WITHDRAW;
      const banknotes: Banknotes = {
        100: 1,
        50: 1,
        20: 1,
        10: 1,
      };

      const account = {
        id: accountId,
        totalValue: 200,
      };

      jest
        .spyOn(prismaService.account, 'findUnique')
        .mockResolvedValue(account as Account);

      await expect(
        service.create({ accountId, value, movementType, banknotes }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the banknotes are not enough to cover the withdraw value', async () => {
      const value = 300;
      const movementType = ACCOUNT_MOVEMENT_TYPE.WITHDRAW;
      const banknotes: Banknotes = {
        100: 1,
        50: 1,
        20: 1,
        10: 0,
      };

      const account = {
        id: accountId,
        totalValue: 200,
      };

      jest
        .spyOn(prismaService.account, 'findUnique')
        .mockResolvedValue(account as Account);

      await expect(
        service.create({ accountId, value, movementType, banknotes }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
