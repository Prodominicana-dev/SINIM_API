import { Controller, Get, Param, Res } from '@nestjs/common';

const fs = require('fs');
const path = require('path');
@Controller('data')
export class DataController {

@Get('image/:imageName')
getImage(@Param('imageName') imageName: string, @Res() res): void {
  const imagePath = path.join(__dirname, '../../../public/data/images', imageName);
  const fileStream = fs.createReadStream(imagePath);
  fileStream.pipe(res);
}
}
