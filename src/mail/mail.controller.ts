import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('apiv2/mail')
export class MailController {
    constructor( private mailService : MailService){}
    
    

}
