import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, saim) {

    await this.mailerService.sendMail({
      to: ['randy140801@gmail.com', 'eliamps07@gmail.com', 'eliamps07@outlook.com, eliampimentel@prodominicana.gob.do'],
      subject: `SINIM - ${saim.title}`,
      template: './suscription', // 👈 either change to ./transactional or rename transactional.html to confirmation.html
      context: { // ✏️ filling curly brackets with content
        name: "Eliam Pimentel",
        products: [{name: "Oranges"}, {name: "Apples"}],
        countries: [{name: "Spain"}, {name: "US"}, {name: "Germany"}, {name: "France"}, {name: "Italy"}, {name: "UK"}, {name: "China"}, {name: "Russia"}, {name: "Others"}, {name: "Unknown"},],
      },
    });
  }
}
