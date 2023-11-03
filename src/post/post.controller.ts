import { Controller, Get, Patch, Delete, Body, Param, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { Express, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdirp } from 'mkdirp';
const fs = require('fs');
const path = require('path');

@Controller('apiv2/post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    // Obtener todos los posts
    @Get()
    async findAll() {
        return this.postService.getAll();
    }

    // Obtener post por id
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.postService.getPostById(+id);
    }

    // Obtener posts por idioma
    @Get('language/:language')
    async findByType(@Param('language') language: string) {
        return this.postService.getPostsByLanguage(language);
    }

    // Editar post
    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Param('id') id: string, @Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res) {
        // Si el file no es undefined, actualizar la imagen, borrar la foto de esa carpeta y agregar la nueva
        if (file) {
            const folderPath = path.join(process.cwd(), `public/data/post/pdf/${id}`);
            if (fs.existsSync(folderPath)) {
                await fs.promises.rm(folderPath, { recursive: true }); // Utilizar fs.promises.rmdir para eliminar el directorio de forma asincrónica
            }
            await mkdirp(folderPath);
            const pdfName = `${file.originalname}`;
            fs.writeFile(path.join(folderPath, pdfName), file.buffer, async (err) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                data.pdf = pdfName;
                await this.postService.updatePost(Number(id), data);
                res.status(200).json({ message: data });
            });
        } else
        return this.postService.updatePost(+id, data);
    }

    // Borrar post
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const folderPath = path.join(process.cwd(), `public/data/post/pdf/${id}`);
        if (fs.existsSync(folderPath)) {
            await fs.promises.rm(folderPath, { recursive: true }); // Utilizar fs.promises.rmdir para eliminar el directorio de forma asincrónica
        }
        return this.postService.deletePost(+id);
    }

    // Crear post
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res) {
        const post = await this.postService.createPost(data);
        const folderPath = path.join(process.cwd(), `public/data/post/pdf/${post.id}`);
        await mkdirp(folderPath);
        const pdfName = `${file.originalname}`;
        fs.writeFile(path.join(folderPath, pdfName), file.buffer, (err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                post.pdf = pdfName;
                this.postService.updatePost(post.id, post).then((post) => {
                    if (res.statusCode === 500) {
                        return res.status(500).json({ message: 'Error' });
                    }
                    return res.status(200).json({ message: post });
                });
            }
        }
        );
    }
}
