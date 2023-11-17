import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  Body,
  Put,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Delete,
  Patch,
} from '@nestjs/common';

import { mkdirp } from 'mkdirp';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime-types';
import { PrismaService } from 'src/prisma/prisma.service';
import { SiedService } from './sied.service';

const fs = require('fs');
const path = require('path');
const imageBase64 = require('image-base64');

@Controller('apiv2/sied')
export class SiedController {
  constructor(
    private readonly siedService: SiedService,
    private prisma: PrismaService,
  ) {}

  @Get()
  async getActiveSied() {
    return this.siedService.getActiveSied();
  }

  @Get('page/:id')
  async getActivePaginatedSied(@Param('id') page: number) {
    return this.siedService.getActivePaginatedSied({ page });
  }

  @Get('page/public/:id')
  async getPublicPaginated(@Param('id') page: number) {
    return this.siedService.getPublicPaginated({ page });
  }

  @Get('all')
  async getSied() {
    return this.siedService.getSied();
  }

  @Get('page/all/:id')
  async getPaginatedSied(@Param('id') page: number) {
    return this.siedService.getPaginatedSied({ page });
  }

  @Get(':id')
  async getSiedById(@Param('id') id: number) {
    return this.siedService.getSiedById(Number(id));
  }

  // Update Sied
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateSied(
    @Param('id') id: string,
    @Body() data,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    data.categoryId = Number(data.categoryId);
    data.published = Boolean(data.published);
    data.isPublic = data.isPublic === 'true';

    if (file === undefined) {
      const sied = await this.siedService.updateSied(Number(id), data);
      if (res.statusCode === 500) {
        return res.status(500).json({ message: 'Error' });
      }
      return res.status(200).json({ message: sied });
    }

    const folderPath = path.join(
      process.cwd(),
      `public/data/sied/images/${id}`,
    );
    if (fs.existsSync(folderPath)) {
      await fs.promises.rm(folderPath, { recursive: true }); // Utilizar fs.promises.rmdir para eliminar el directorio de forma asincrónica
    }
    await mkdirp(folderPath);
    const imageName = `${new Date().getTime()}.${file.originalname
      .split('.')
      .pop()}`;
    fs.writeFile(path.join(folderPath, imageName), file.buffer, async (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      data.image = imageName;
      await this.siedService.updateSied(Number(id), data);
      res.status(200).json({ message: data });
    });
  }

  // Create SAIM
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createSied(
    @Body() data,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    data.categoryId = Number(data.categoryId);
    data.published = Boolean(data.published);
    data.isPublic = data.isPublic === 'true';
    // Crear el SAIM
    const saim = await this.siedService.createSAIM(data);

    const folderPath = path.join(
      process.cwd(),
      `public/data/sied/images/${saim.id}`,
    );
    await mkdirp(folderPath);
    const imageName = `${new Date().getTime()}.${file.originalname
      .split('.')
      .pop()}`;
    fs.writeFile(path.join(folderPath, imageName), file.buffer, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        saim.image = imageName;
        this.siedService.updateSied(saim.id, saim);
        res.status(200).json({ message: saim });
      }
    });
  }

  // Delete SAIM (soft delete)
  @Delete(':id')
  async deleteSied(@Param('id') id: number, @Res() res: Response) {
    const saim = await this.siedService.getSiedById(Number(id));
    if (saim) {
      await this.siedService.deleteSAIM(Number(id));
      return res.status(200).json({ message: 'SAIM eliminado' });
    } else {
      return res.status(500).json({ message: 'Error al eliminar el SAIM' });
    }
  }

  // Delete definitive SAIM
  @Delete('d/:id')
  async deleteDefinitiveSied(@Param('id') id: number, @Res() res: Response) {
    // Borrar la carpeta con las fotos del saim y luego borrarlo de la base de datos
    const folderPath = path.join(
      process.cwd(),
      `public/data/sied/images/${id}`,
    );
    if (fs.existsSync(folderPath)) {
      await fs.promises.rm(folderPath, { recursive: true }); // Utilizar fs.promises.rmdir para eliminar el directorio de forma asincrónica
    }
    const sied = await this.siedService.deleteDefinitiveSied(Number(id));
    if (!sied) {
      return res.status(404).json({ message: 'No encontrado' });
    }
    return res.status(200).json({ message: sied });
  }

  // Publish SAIM
  @Patch('publish/:id')
  async publishSied(@Param('id') id: number, @Res() res: Response) {
    const published = await this.siedService.publishSied(Number(id));
    if (!published) {
      return res.status(500).json({ message: 'Error al publicar el SAIM' });
    }
    return res.status(200).json({ message: published });
  }

  // Get all saims but in a group by
  @Get('t/1')
  async getSAIMTest() {
    return await this.prisma.alerts.groupBy({
      by: ['platform'],
      _count: {
        platform: true,
      },
    });
  }
}
