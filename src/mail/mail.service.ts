import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, saim) {

    await this.mailerService.sendMail({
      to: 'eliampimentel@prodominicana.gob.do',
      subject: `SINIM - ${saim.title}`,
      template: './promotional', // 👈 either change to ./transactional or rename transactional.html to confirmation.html
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url: 'probando.com',
      },
    });
  }
}
