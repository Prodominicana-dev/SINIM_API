import { Controller, Get, Patch, Delete, Body, Param, Post, UseInterceptors, UploadedFile, Res, Put } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Express, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdirp } from 'mkdirp';
const fs = require('fs');
const path = require('path');

@Controller('apiv2/partner')
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) {}

    // Obtener todos los partners
    @Get()
    async findAll() {
        return this.partnerService.findAll();
    }

    // Obtener partner por id
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.partnerService.findOne(+id);
    }

    // Obtener partners por tipo
    @Get('type/:type')
    async findByType(@Param('type') type: string) {
        return this.partnerService.findByType(type);
    }

    // Editar partner
    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Param('id') id: string, @Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res) {
        // Si el file no es undefined, actualizar la imagen, borrar la foto de esa carpeta y agregar la nueva
        if (file) {
            const folderPath = path.join(process.cwd(), `public/data/partner/images/${id}`);
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
                await this.partnerService.update(Number(id), data);
                res.status(200).json({ message: data });
            });
        } else
        return this.partnerService.update(+id, data);
    }

    // Borrar partner
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const folderPath = path.join(process.cwd(), `public/data/partner/images/${id}`);
        if (fs.existsSync(folderPath)) {
            await fs.promises.rm(folderPath, { recursive: true }); // Utilizar fs.promises.rmdir para eliminar el directorio de forma asincrónica
        }
        return this.partnerService.deleteOne(+id);
    }

    // Crear partner
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res) {
        const partner = await this.partnerService.create(data);
        const folderPath = path.join(process.cwd(), `public/data/partner/images/${partner.id}`);
        await mkdirp(folderPath);
        const imageName = `${new Date().getTime()}.${file.originalname.split('.').pop()}`;
        fs.writeFile(path.join(folderPath, imageName), file.buffer, (err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                partner.image = imageName;
                this.partnerService.update(partner.id, partner).then((partner) => {
                    if (res.statusCode === 500) {
                        return res.status(500).json({ message: 'Error' });
                    }
                    return res.status(200).json({ message: partner });
                });
            }
        }
        );
    }
}
