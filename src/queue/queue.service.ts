import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Queue, QueueOptions, Worker, Job } from 'bullmq';
import { MailService } from 'src/mail/mail.service';
import  IORedis from 'ioredis';

const connection = new IORedis({
    port: 6379,
    maxRetriesPerRequest: null,
});

// Crear constantes para la inyección de dependencias
export const EMAIL_QUEUE = 'EMAIL_QUEUE';
export const EMAIL_QUEUE_OPTIONS = {
  connection,
  defaultJobOptions: { removeOnComplete: true },
};
export const EMAIL_WORKER = 'EMAIL_WORKER';

@Injectable()
export class QueueService implements OnModuleInit {
  constructor (
    @Inject(EMAIL_QUEUE) private emailQueue: Queue,
    private mailService: MailService,
  ) {}

  async onModuleInit(): Promise<void> {
    const sendEmail = async (job: Job) => {
      const { saim, subscribers } = job.data;
      for (const suscriber of subscribers){
        await this.mailService.newAlertaComercialMail(
          saim.title,
          saim.category,
          saim.description,
          `https://sinim.prodominicana.gob.do/apiv2/data/saim/${saim.id}/img/${saim.image}`,
          suscriber.email
        );
      }
    }

    const worker = new Worker('emails', sendEmail, EMAIL_QUEUE_OPTIONS);
    worker.on('completed', job => {
      console.log(`Job with id ${job.id} has been completed`);
    });
  }

  async addJob(jobData: any): Promise<void> {
    // Usar el método add de la cola directamente
    await this.emailQueue.add('emails', jobData);
  }
}