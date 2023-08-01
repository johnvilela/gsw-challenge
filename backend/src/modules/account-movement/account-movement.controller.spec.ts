import { Test, TestingModule } from '@nestjs/testing';
import { AccountMovementController } from './account-movement.controller';
import { AccountMovementService } from './account-movement.service';
import { AccountMovementResponse } from './dto/create-account-movement.dto';
import { ACCOUNT_MOVEMENT_TYPE } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

describe('AccountMovementController', () => {
  let controller: AccountMovementController;
  let service: AccountMovementService;

  const accountId = '64c8a41daa55f620efc99676';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountMovementController],
      providers: [AccountMovementService, PrismaService],
    }).compile();

    controller = module.get<AccountMovementController>(
      AccountMovementController,
    );
    service = module.get<AccountMovementService>(AccountMovementService);
  });

  describe('create', () => {
    it('should create a new deposity', async () => {
      const data = {
        accountId,
        value: 100,
        movementType: ACCOUNT_MOVEMENT_TYPE.DEPOSIT,
      };
      const result = {
        id: '1',
        ...data,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(result as AccountMovementResponse);

      const response = await controller.createMovement(data);

      expect(response).toBe(result);
      expect(response.banknotes).toBeUndefined();
      expect(service.create).toHaveBeenCalledWith(data);
    });

    it('should create a new withdraw', async () => {
      const data = {
        accountId,
        value: 100,
        movementType: ACCOUNT_MOVEMENT_TYPE.WITHDRAW,
        banknotes: {
          100: 1,
          50: 1,
          20: 1,
          10: 1,
        },
      };
      const result = {
        id: '1',
        ...data,
        banknotes: {
          100: 1,
        },
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(result as AccountMovementResponse);

      const response = await controller.createMovement(data);

      expect(response).toBe(result);
      expect(response.banknotes).toBe(result.banknotes);
      expect(service.create).toHaveBeenCalledWith(data);
    });
  });
});
