import { Controller } from '@nestjs/common';
import { RamisService } from './ramis.service';
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('apiv2/rami')
export class RamisController {
  constructor(private ramiService: RamisService) {}

  @Get()
  async getAllRamis() {
    return this.ramiService.getAllRamis();
  }

  @Get('settings')
  async getAllSettingsRamis() {
    return this.ramiService.getAllSettingsRamis();
  }

  @Get('product/:productId/country/:countryId')
  async getRamisByProductIdAndCountryId(
    @Param('productId') productId: number,
    @Param('countryId') countryId: number,
  ) {
    return this.ramiService.getRamisByProductIdAndCountryId(
      Number(productId),
      Number(countryId),
    );
  }

  @Get(':id')
  async getRamisById(@Param('id') id: number) {
    return this.ramiService.getRamisById(Number(id));
  }

  @Post()
  async createRamis(@Body() data: any) {
    return this.ramiService.createRamis(data);
  }

  @Put(':id')
  async editRamis(@Param('id') id: number, @Body() data: any) {
    return this.ramiService.editRamis(Number(id), data);
  }

  @Delete(':id')
  async deleteRamiById(@Param('id') id: number) {
    return this.ramiService.deleteRamiById(Number(id));
  }
}
