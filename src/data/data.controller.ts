import { Controller, Get, Param, Res, Post, Body, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';

const fs = require('fs');
const path = require('path');
@Controller('data')
export class DataController {

@Get('image/:imageName')
getImage(@Param('imageName') imageName: string, @Res() res): void {
  const imagePath = path.join(__dirname, '../../public/data/images', imageName);
  const fileStream = fs.createReadStream(imagePath);
  fileStream.pipe(res);
}

@Post('image')
uploadImage(@Res() res, @Body() body): void {
    const base64Data = body.base64.replace(/^data:image\/([\w+/]+);base64,/, '');
    const fileExtension = body.base64.substring("data:image/".length, body.base64.indexOf(";base64"));
    const imageName = `${new Date().getTime()}.${fileExtension}`;
    fs.writeFile(path.join(__dirname, '../../public/data/images', imageName), base64Data, 'base64', (err) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ imageName });
        }
    });
    
}

@Get('file/:fileName')
getFile(@Param('fileName') fileName: string, @Res() res): StreamableFile {
    const file = createReadStream(path.join(__dirname, '/public/data/images/', fileName));
    return new StreamableFile(file);
}
}
