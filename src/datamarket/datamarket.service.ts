import { Injectable } from '@nestjs/common';
import { Prisma, Datamarket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatamarketService {
    constructor( private readonly prismaService : PrismaService){}

    async getActiveDatamarket(): Promise<Datamarket[]> {
        return this.prismaService.datamarket.findMany({
            where:{
                status: 'active'
            }
        });
    }

    async getDatamarket(): Promise<Datamarket[]> {
        return this.prismaService.datamarket.findMany();
    }

    async getDatamarketById(id: number): Promise<Datamarket> {
        return this.prismaService.datamarket.findUnique({
            where:{
                id: id
            }
        });
    }

    async getGroupByCategory(): Promise<any[]> {
        return this.prismaService.datamarket.findMany({
            where:{
                status: 'active'
            },
            distinct: ['category'],
            orderBy: {
                category: 'asc'
            },
            select:{
                category: true
            }
        });
    }

    async getDatamarketByCategory(): Promise<Datamarket[]> {
        let data = []
        const categories = await this.getGroupByCategory();
        for(const cat of categories){
           const datamarket =  await this.prismaService.datamarket.findMany({
                where:{
                    category: cat.category,
                    status: 'active'
                },
            });
            const datacat = {
                category: cat.category,
                data: datamarket
            }
            data.push(datacat);
        }
        return data
    }

    async create(datamarket: Prisma.DatamarketCreateInput): Promise<Datamarket> {
        if(datamarket.category == null){
            datamarket.category = datamarket.title;
        }
        return this.prismaService.datamarket.create({
            data: datamarket
        });
    }

    async edit(id: number, datamarket: Prisma.DatamarketUpdateInput): Promise<Datamarket> {
        return this.prismaService.datamarket.update({
            where:{
                id: id
            },
            data: datamarket
        });
    }

    async deactive(id: number): Promise<Datamarket> {
        return this.prismaService.datamarket.update({
            where:{
                id: id
            },
            data:{
                status: 'inactive'
            }
        });
    }

    async dDelete(id: number): Promise<Datamarket> {
        return this.prismaService.datamarket.delete({
            where:{
                id: id
            }
        });
    }
}
