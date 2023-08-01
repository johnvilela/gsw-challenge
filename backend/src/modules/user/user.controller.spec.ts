import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from '../../services/prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: '1', name: 'John Doe', email: 'johndoe@example.com' },
        { id: '2', name: 'Jane Doe', email: 'janedoe@example.com' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users as User[]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
      };
      jest.spyOn(service, 'findByEmail').mockResolvedValue(user as User);

      const result = await controller.findByEmail({ email: user.email });

      expect(service.findByEmail).toHaveBeenCalledWith(user.email);
      expect(result).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: CreateUserDTO = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };
      const createdUser = { id: '1', ...user };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser as User);

      const result = await controller.create(user);

      expect(service.create).toHaveBeenCalledWith(user);
      expect(result).toEqual(createdUser);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const id = '1';
      jest.spyOn(service, 'delete').mockResolvedValue();

      await controller.delete(id);

      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
