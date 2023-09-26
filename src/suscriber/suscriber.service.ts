import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

interface Suscriber{
    email: string;
    platform: string;
    name: string;
    countryId: number[];
    productId: number[];
    status?: string;
}

@Injectable()
export class SuscriberService {
    constructor(private readonly prismaService : PrismaService) {}

    async createSubscriber(data) {
        const { products, countries, ...subscriberData } = data;
    
        return await this.prismaService.suscriber.create({
            data: {
                ...subscriberData,
                suscriber_countries: {
                    create: countries.map(countryId => ({
                        countryId
                    }))
                },
                suscriber_products: {
                    create: products.map(productId => ({
                        productId
                    }))
                }
            }
        });
    }

    // Get suscriber by email and platform
    async getSuscriberByEmailAndPlatform(email: string, platform: string) {
        return await this.prismaService.suscriber.findFirst({
            where: { 
                email,
                platform   
            }
        });
    }

    // Get suscriber by email
    async getSubscriberByEmail(email) {
        return await this.prismaService.suscriber.findFirst({
            where: {
                email
            },
            include: {
                suscriber_countries: {
                    include: {
                        country: true
                    }
                },
                suscriber_products: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    // Get suscriber by id
    async getSuscriberById(id: number) {
        return await this.prismaService.suscriber.findUnique({
            where: { 
                id
            }
        });
    }

    // Get all suscribers by platform
    async getAllSuscribersByPlatform(platform: string) {
        return await this.prismaService.suscriber.findMany({
            where: { 
                platform
            }
        });
    }

    // // Update suscriber by email and platform
    async  updateSubscriber(email, platform, data) {
        const { products, countries, ...subscriberData } = data;
    
        // Primero, busca el suscriptor a actualizar
        const subscriber = await this.prismaService.suscriber.findFirst({
            where: {
                email: email,
                platform: platform
            }
        });
    
        if (!subscriber) {
            throw new Error(`No se encontró ningún suscriptor con el correo electrónico ${email} y la plataforma ${platform}`);
        }
    
        // Luego, actualiza el suscriptor y sus relaciones
        return await this.prismaService.suscriber.update({
            where: { id: subscriber.id },
            data: {
                ...subscriberData,
                suscriber_countries: {
                    deleteMany: {}, // Borrará todas las relaciones existentes
                    create: countries.map(countryId => ({ countryId }))
                }, 
                suscriber_products: {
                    deleteMany: {}, // Borrará todas las relaciones existentes
                    create: products.map(productId => ({ productId }))
                }
            },
            include: {
                suscriber_countries: {
                    include: {
                        country: true
                    }
                },
                suscriber_products: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }
    
    
    

}
