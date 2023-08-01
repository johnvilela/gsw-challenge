import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { AccountService } from './account.service';
import { Account } from '@prisma/client';

describe('AccountService', () => {
  let service: AccountService;
  let prismaService: PrismaService;

  const accountData = {
    id: '123',
    userId: '64c8a41daa55f620efc99676',
    totalValue: 10000,
  };
  const id = '64c8a41daa55f620efc99676';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService, PrismaService],
    }).compile();

    service = module.get<AccountService>(AccountService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create an account', async () => {
      const mockCreate = jest
        .spyOn(prismaService.account, 'create')
        .mockResolvedValue(accountData as Account);

      const account = await service.create(id);

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          userId: id,
        },
      });
      expect(account).toEqual(accountData);
    });
  });

  describe('update', () => {
    it('should update an account', async () => {
      const mockUpdate = jest
        .spyOn(prismaService.account, 'update')
        .mockResolvedValue({ ...accountData, totalValue: 100 } as Account);
      const data = { totalValue: 100 };

      const updatedAccount = await service.update(id, data);

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id },
        data,
      });
      expect(updatedAccount.totalValue).toBe(100);
    });
  });

  describe('findByUser', () => {
    it('should find accounts by user', async () => {
      const mockFindMany = jest
        .spyOn(prismaService.account, 'findUnique')
        .mockResolvedValue(accountData as Account);

      const accountFound = await service.findByUser(id);

      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId: id },
        select: {
          movements: true,
        },
      });
      expect(accountFound).toEqual(accountData);
    });
  });

  describe('delete', () => {
    it('should delete an account', async () => {
      const mockDelete = jest
        .spyOn(prismaService.account, 'delete')
        .mockImplementation();

      await service.delete(id);

      expect(mockDelete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
