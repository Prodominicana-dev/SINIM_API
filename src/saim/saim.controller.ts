import { Controller, Get, Param, Res, Post, Body, Put, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SaimService } from './saim.service';
import { mkdirp } from 'mkdirp';
import { Express, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime-types';

const fs = require('fs');
const path = require('path');
const imageBase64 = require('image-base64');

@Controller('saim')
export class SaimController {
    constructor(private readonly saimService: SaimService) {}

    @Get()
    async getSAIM() {
        return this.saimService.getSAIM();
    }

    @Get('page/:id')
    async getPaginatedSaim(@Param('id') page: number) {
        return this.saimService.getPaginatedSaim({page});
    }

    @Get(':id')
    async getSAIMById(@Param('id') id: number) {
        return this.saimService.getSAIMById(Number(id));
    }

    @Put(':id')
    async updateSAIM(@Param('id') id: number, @Body() data) {
        return this.saimService.updateSAIM(Number(id), data);
    }

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
}


