import { Controller, Get, Param, Res, Post, Body, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { SaimService } from 'src/saim/saim.service';
import { mkdirp } from 'mkdirp';


const fs = require('fs');
const path = require('path');
const imageBase64 = require('image-base64');
@Controller('data')
export class DataController {
constructor(private readonly saimService: SaimService) {}

@Get('saim/:id/img/:imageName')
getImage(@Param('id') id: string, @Param('imageName') imageName: string, @Res() res): void {
  const imagePath = path.join(__dirname, `../../public/data/saim/images/${id}`, imageName);
  const fileStream = fs.createReadStream(imagePath);
  fileStream.pipe(res);
}

@Post('saim/:id/image')
uploadImage(@Param('id') id: number, @Res() res, @Body() body): void {
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

@Get('newImages')
async setNewSAIMages(@Res() res): Promise<void> {
    
    const saim = await this.saimService.getSAIM();
    for await (const s of saim) {
        const saimImg64 = await imageBase64.local(path.join(__dirname,'../../public/data/images', s.image));
        const base64Data = saimImg64.replace(/^data:image\/([\w+/]+);base64,/, '');
        const fileExtension = saimImg64.substring("data:image/".length, saimImg64.indexOf(";base64"));
        const imageName = `${new Date().getTime()}.${fileExtension}`;
        
        const folderPath = path.join(process.cwd(), `public/data/saim/images/${s.id}`);
        await mkdirp(folderPath);
        
        await fs.writeFile(path.join(folderPath, imageName), base64Data, 'base64', (err) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            s.image = imageName;
            this.saimService.updateSAIM(s.id, s); 
        });
    }
    res.status(200).json({ message: 'ok' });
}

@Get('file/:fileName')
getFile(@Param('fileName') fileName: string, @Res() res): StreamableFile {
    const file = createReadStream(path.join(__dirname, '/public/data/images/', fileName));
    return new StreamableFile(file);
}
}
