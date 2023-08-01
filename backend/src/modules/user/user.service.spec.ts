import { PrismaService } from '../../services/prisma/prisma.service';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = { name: 'John Doe', email: 'johndoe@example.com' };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user as User);

      const result = await service.create(user);

      expect(prismaService.user.create).toHaveBeenCalledWith({ data: user });
      expect(result).toEqual(user);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const user = { id: '1', name: 'John Doe', email: 'johndoe@example.com' };
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(user as User);

      const result = await service.findByEmail(user.email);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: user.email },
      });
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users = [
        { id: '1', name: 'John Doe', email: 'johndoe@example.com' },
        { id: '2', name: 'Jane Doe', email: 'janedoe@example.com' },
      ];

      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(users as User[]);

      const result = await service.findAll();

      expect(prismaService.user.findMany).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = { id: '1', name: 'John Doe', email: 'johndoe@example.com' };

      jest.spyOn(prismaService.user, 'delete').mockImplementation();

      await service.delete(user.id);

      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });
  });
});
