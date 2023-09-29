import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

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
    constructor(private readonly prismaService : PrismaService,
        private readonly mailService : MailService) {}

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
    async  updateSubscriber(data) {
        const { products, countries, email, platform, ...subscriberData } = data;
    
        // Primero, busca el suscriptor a actualizar
        const subscriber = await this.prismaService.suscriber.findFirst({
            where: {
                email: email,
                platform: platform
            }
        });
    
        if (!subscriber) {
            // crearlo si no existe
           const sub = await this.createSubscriber(data)
           const suscriptor = await this.getSuscriberByEmailAndPlatform(sub.email, sub.platform)
           const countries = suscriptor.suscriber_countries.map(country => ({ name: country.country.name }));
            const products = suscriptor.suscriber_products.map(product => ({ name: product.product.name }));
            const title = "Suscripción a las Alertas Comerciales"
            return await this.mailService.alertaComercialMail(title, sub.email, sub.name, products, countries).then(async () => {
                const title = "Nueva Suscripción a las Alertas Comerciales"
                return await this.mailService.alertaComercialNotifyMail(title, 'inteligenciademercados@prodominicana.gob.do', sub.name, products, countries)
            })
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
        }).then(async (sub) => {
            const countries = sub.suscriber_countries.map(country => ({ name: country.country.name }));
            const products = sub.suscriber_products.map(product => ({ name: product.product.name }));
            const title = "Actualización de la suscripción a las Alertas Comerciales"
            return await this.mailService.alertaComercialMail(title, sub.email, sub.name, products, countries)
        });
    }
    
    
    

}
