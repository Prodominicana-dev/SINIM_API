import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users, Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: number): Promise<Users | null> {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() data: Prisma.UsersUpdateInput,
  ): Promise<Users> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<Users> {
    return this.usersService.deleteUser(id);
  }
}
