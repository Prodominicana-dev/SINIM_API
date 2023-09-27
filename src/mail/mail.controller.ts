import { Controller, Get, Post, Param } from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('mail')
export class MailController {
    constructor( private mailService : MailService){}
    
    @Get()
    async sendUserConfirmation(){
        const user = {
            name: 'Eliam',
            email: ''
        }
        const saim = {title: 'TEST'}
        await this.mailService.sendUserConfirmation(user, saim);
    }

}
