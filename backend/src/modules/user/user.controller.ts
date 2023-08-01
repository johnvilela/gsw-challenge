import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/email')
  @ApiQuery({ name: 'email' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  async findByEmail(@Query() { email }: { email: string }) {
    return this.userService.findByEmail(email);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new user.' })
  async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deletes a user by id.' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
