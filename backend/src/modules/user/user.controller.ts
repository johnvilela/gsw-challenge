import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/email')
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  async findByEmail(@Body() { email }: { email: string }): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new user.' })
  async create(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  @ApiParam({ name: 'User id' })
  @ApiResponse({ status: 200, description: 'Deletes a user by id.' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
