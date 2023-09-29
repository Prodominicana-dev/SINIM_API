import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('mail')
export class MailController {
    constructor( private mailService : MailService){}
    
    

}
