import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            findByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findByUser', () => {
    it('should find accounts by user', async () => {
      const mockFindByUser = service.findByUser as jest.Mock;
      const userId = '64c8a41daa55f620efc99676';

      await controller.findByUser(userId);

      expect(mockFindByUser).toHaveBeenCalledWith(userId);
    });
  });
});
