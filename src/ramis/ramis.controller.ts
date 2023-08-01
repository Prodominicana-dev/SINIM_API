import { Controller } from '@nestjs/common';
import { RamisService } from './ramis.service';
import { Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('ramis')
export class RamisController {
  constructor(private ramiService: RamisService) {}

  @Get()
  async getAllRamis() {
    return this.ramiService.getAllRamis();
  }

  @Get(':id')
  async getRamisById(@Param('id') id: string) {
    return this.ramiService.getRamisById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRamis(@Body() data: any) {
    return this.ramiService.createRamis(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async editRamis(@Param('id') id: string, @Body() data: any) {
    return this.ramiService.editRamis(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRamiById(@Param('id') id: string) {
    return this.ramiService.deleteRamiById(id);
  }
}
