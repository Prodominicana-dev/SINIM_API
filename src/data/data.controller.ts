import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  Body,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SaimService } from 'src/saim/saim.service';
import { mkdirp } from 'mkdirp';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime-types';

const fs = require('fs');
const path = require('path');
const imageBase64 = require('image-base64');
@Controller('api/data')
export class DataController {
  constructor(private readonly saimService: SaimService) {}

  /*
   *   Obtener las imagenes de los SAIM por su id y nombre de imagen.
   */
  @Get('saim/:id/img/:imageName')
  getImage(
    @Param('id') id: string,
    @Param('imageName') imageName: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    res.set({ 'Content-Type': 'image/jpeg' });
    const imagePath = path.join(
      __dirname,
      `../../public/data/saim/images/${id}`,
      imageName,
    );
    //   const mimeType = mime.lookup(imageName);
    //   if (!mimeType) {
    //     return undefined;
    //   }
    const fileStream = fs.createReadStream(imagePath);
    const streamableFile = new StreamableFile(fileStream);
    //   streamableFile.options.type = mimeType
    return streamableFile;
  }

  /*
   *   Subir imagenes de los SAIM por su id.
   */
  @Post('saim/:id/img')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Res() res,
  ) {
    const saim = await this.saimService.getSAIMById(Number(id));
    const folderPath = path.join(
      process.cwd(),
      `public/data/saim/images/${id}`,
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
        this.saimService.updateSAIM(saim.id, saim);
        res.status(200).json({ message: saim });
      }
    });
  }

  @Get('newImages')
  async setNewSAIMages(@Res() res): Promise<void> {
    const saim = await this.saimService.getSAIM();
    for await (const s of saim) {
      const saimImg64 = await imageBase64.local(
        path.join(__dirname, '../../public/data/images', s.image),
      );
      const base64Data = saimImg64.replace(
        /^data:image\/([\w+/]+);base64,/,
        '',
      );
      const fileExtension = saimImg64.substring(
        'data:image/'.length,
        saimImg64.indexOf(';base64'),
      );
      const imageName = `${new Date().getTime()}.${fileExtension}`;

      const folderPath = path.join(
        process.cwd(),
        `public/data/saim/images/${s.id}`,
      );
      await mkdirp(folderPath);

      await fs.writeFile(
        path.join(folderPath, imageName),
        base64Data,
        'base64',
        (err) => {
          if (err) {
            res.status(500).json({ error: err });
          }
          s.image = imageName;
          this.saimService.updateSAIM(s.id, s);
        },
      );
    }
    res.status(200).json({ message: 'ok' });
  }
}
