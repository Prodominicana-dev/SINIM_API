import { Controller, Get, Param, Res, Post, Body, Put, StreamableFile, UploadedFile, UseInterceptors, Delete, Patch } from '@nestjs/common';
import { SaimService } from './saim.service';
import { mkdirp } from 'mkdirp';
import { Express, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime-types';
import { PrismaService } from 'src/prisma/prisma.service';

const fs = require('fs');
const path = require('path');
const imageBase64 = require('image-base64');

@Controller('apiv2/saim')
export class SaimController {
    constructor(private readonly saimService: SaimService, private prisma: PrismaService) {}

    @Get()
    async getActiveSAIM() {
        return this.saimService.getActiveSAIMAlerts();
    }

    @Get('page/:id')
    async getActivePaginatedSaim(@Param('id') page: number) {
        return this.saimService.getActivePaginatedSaim({page});
    }

    @Get('all')
    async getSAIM() {
        return this.saimService.getSAIM();
    }

    @Get('page/all/:id')
    async getPaginatedSaim(@Param('id') page: number) {
        return this.saimService.getPaginatedSaim({page});
    }

    @Get(':id')
    async getSAIMById(@Param('id') id: number) {
        return this.saimService.getSAIMById(Number(id));
    }

    // Update SaIM
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateSAIM(@Param('id') id: string, @Body() data, @UploadedFile() file: Express.Multer.File, @Res() res) {
        const saim = await this.saimService.getSAIMById(Number(id));
        // Convertir data.products y data.countries a JSON
        if (data.products) {
            data.products = JSON.parse(data.products);
        }
        if (data.countries) {
            data.countries = JSON.parse(data.countries);
        }
        // Si el file no es undefined, actualizar la imagen, borrar la foto de esa carpeta y agregar la nueva
        if (file) {
            const folderPath = path.join(process.cwd(), `public/data/saim/images/${id}`);
            if (fs.existsSync(folderPath)) {
                await fs.promises.rm(folderPath, { recursive: true }); // Utilizar fs.promises.rmdir para eliminar el directorio de forma asincrónica
            }
            await mkdirp(folderPath);
            const imageName = `${new Date().getTime()}.${file.originalname.split('.').pop()}`;
            fs.writeFile(path.join(folderPath, imageName), file.buffer, async (err) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                data.image = imageName;
                await this.saimService.updateSAIM(Number(id), data);
                res.status(200).json({ message: data });
            });
        } else {
            // Si no se subió un archivo, simplemente actualiza los datos
            await this.saimService.updateSAIM(Number(id), data).then((saim) => {
                if (res.statusCode === 500) {
                    return res.status(500).json({ message: 'Error' });
                }
                return res.status(200).json({ message: saim });
            });
        }
    }

    // Create SAIM
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createSAIM(@Body() data, @UploadedFile() file: Express.Multer.File, @Res() res) {
        // Convertir data.products y data.countries a JSON
        data.products = JSON.parse(data.products);
        data.countries = JSON.parse(data.countries);
        // Crear el SAIM
        const saim = await this.saimService.createSAIM(data); 
        const folderPath = path.join(process.cwd(), `public/data/saim/images/${saim.id}`);
        await mkdirp(folderPath);
    const imageName = `${new Date().getTime()}.${file.originalname.split('.').pop()}`;
    fs.writeFile(path.join(folderPath, imageName), file.buffer, (err) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            saim.image = imageName;
            this.saimService.updateSAIM(saim.id, saim);
            res.status(200).json({ message: saim });
        }
    }
    );
    }

    // Delete SAIM (soft delete)
    @Delete(':id')
    async deleteSaim(@Param('id') id: number, @Res() res: Response) {
        const saim = await this.saimService.getSAIMById(Number(id));
        if (saim) {
            await this.saimService.deleteSAIM(Number(id));
            res.status(200).json({ message: 'SAIM eliminado' });
        } else {
            res.status(500).json({ message: 'Error al eliminar el SAIM' });
        }
    }

    // Delete definitive SAIM
    @Delete('d/:id')
    async deleteDefinitiveSaim(@Param('id') id: number, @Res() res: Response) {
        // Borrar la carpeta con las fotos del saim y luego borrarlo de la base de datos
        const folderPath = path.join(process.cwd(), `public/data/saim/images/${id}`);
        return await this.saimService.deleteDefinitiveSAIM(Number(id)).then((saim) => {
            if (res.statusCode === 500) {
                return res.status(500).json({ message: 'Error' });
            }
            return res.status(200).json({ message: saim });
        });
    }

    // Publish SAIM
    @Patch('publish/:id')
    async publishSaim(@Param('id') id: number, @Res() res: Response) {
        return await this.saimService.publishSaim(Number(id)).then((saim) => {
            if (res.statusCode === 500) {
                return res.status(500).json({ message: 'Error' });
            }
            return res.status(200).json({ message: saim });
        });
    }

    // Get all saims but in a group by
    @Get('t/1')
    async getSAIMTest() {
        return await this.prisma.alerts.groupBy({
            by: ['platform'],
            _count: {
              platform: true,
            },
          })
    }

}


