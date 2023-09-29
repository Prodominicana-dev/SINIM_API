import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async alertaComercialMail(title, email, name, products, countries) {

    await this.mailerService.sendMail({
      to: email,
      subject: `SINIM - ${title}`,
      template: './suscription', 
      context: { 
        name,
        products,
        countries,
      },
    });
  }
}
