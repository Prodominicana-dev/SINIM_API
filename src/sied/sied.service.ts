import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Sied } from '@prisma/client';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { SuscriberService } from 'src/suscriber/suscriber.service';
import { QueueService } from 'src/queue/queue.service';

const paginate: PaginatorTypes.PaginateFunction = paginator({
    page: 1,
    perPage: 8,
  });

@Injectable()
export class SiedService {
    constructor( private prisma: PrismaService, private suscriberService : SuscriberService, private queueService: QueueService){}
    async getActiveSied(): Promise<Sied[]> {
        return this.prisma.sied.findMany({
          where: {
            status: 'active',
          },
          orderBy: {
            date: 'desc',
          },
        });
      }
    
      async getActivePaginatedSied({
        page,
        perPage,
        where,
        orderBy,
      }: {
        page?: number;
        perPage?: number;
        where?: Prisma.AlertsWhereInput;
        orderBy?: Prisma.AlertsOrderByWithRelationInput;
      }): Promise<PaginatorTypes.PaginatedResult<Sied>> {
        return paginate(
          this.prisma.sied,
          {
            where: {
              status: 'active',
            },
            orderBy: {
              date: 'desc',
            },
          },
          {
            page,
            perPage: 8,
          },
        );
      }
    
      async getSied(): Promise<Sied[]> {
        return this.prisma.sied.findMany({
          orderBy: [
            {
                status: "desc",
            },
            {
                id: "asc",
            },
        ],
        });
      }
    
      async getPaginatedSied({
        page,
        perPage,
        where,
        orderBy,
      }: {
        page?: number;
        perPage?: number;
        where?: Prisma.AlertsWhereInput;
        orderBy?: Prisma.AlertsOrderByWithRelationInput;
      }): Promise<PaginatorTypes.PaginatedResult<Sied>> {
        return paginate(
          this.prisma.sied,
          {
            orderBy: [
              {
                  status: "desc",
              },
              {
                  id: "asc",
              },
          ]
          },
          {
            page,
            perPage: 8,
          },
        );
      }
    
      async getSiedById(id: number): Promise<Sied> {
        return this.prisma.sied.findUnique({
          where: {
            id: id,
          },
        });
      }
    
      // Update SAIM data
      async updateSied(id: number, data: Prisma.SiedUpdateInput): Promise<Sied> {
        const sied = await this.getSiedById(id);
        data.published = Boolean(data.published);
        if(!sied.published && data.published){
          await this.publishSied(id);
        }
        return this.prisma.sied.update({
          where: {
            id: id,
          },
          data,
        });
      }
    
      async createSAIM(data: Prisma.SiedCreateInput): Promise<Sied> {
        data.published = Boolean(data.published);
        const saim = await this.prisma.sied.create({
          data,
        });
    
        if(saim.published){
          await this.publishSied(saim.id);
        }
    
        return saim;
      }
    
      async deleteSAIM(id: number): Promise<Sied> {
        return this.prisma.sied.update({
          where: {
            id: id,
          },
          data: {
            status: 'deleted',
          },
        });
      }
    
      async publishSied(id: number): Promise<any> {
        const sied = await this.getSiedById(id);
        const suscribers = await this.suscriberService.getAllSuscribersEmailsByProductsOrCountries(products, countries);
        const job = {
          sied,
          subscribers: suscribers
        }
        // Usa el método addJob en lugar de llamar directamente a la cola.
        await this.queueService.siedJob(job);
    
        return this.prisma.sied.update({
          where: {
            id: id,
          },
          data: {
            published: true,
          },
        });
      }
       
      async deleteDefinitiveSied(id: number): Promise<Sied> {
        
        return this.prisma.sied.delete({
          where: {
            id: id,
          },
        });
      }
}
