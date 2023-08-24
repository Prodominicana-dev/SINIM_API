import { create } from 'domain';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDatabase() {
  // Dominios reservados
  const domains = [
    {
      name: 'gob.do',
      platform: 'saim',
    },
    {
      name: 'gov.do',
      platform: 'saim',
    
    },
    {
      name: 'adoexpo.org',
      platform: 'saim',
      
    },
    {
      name: 'jad.org.do',
      platform: 'saim',
      
    },
    {
      name: 'asiex.org',
      platform: 'saim',
      
    },
    {
      name: 'amcham.org.do',
      platform: 'saim',
      
    },
    {
      name: 'camarasantodomingo.do',
      platform: 'saim',
      
    },
    {
      name: 'camarasantiago.com',
      platform: 'saim',
      
    },
    {
      name: 'gov.do',
      platform: 'sied',
      
    },
    {
      name: 'gob.do',
      platform: 'sied',
      
    },
    {
      name: 'asiex.org',
      platform: 'sied',
      
    },
    {
      name: 'adoexpo.org',
      platform: 'sied',
      
    },
    {
      name: 'amcham.org.do ',
      platform: 'sied',
      
    },
  ];

  for (const domain of domains) {
    await prisma.reservedDomains.create({
      data: {
        name: domain.name,
        platform: domain.platform,
      },
    });
  }

  const tools = [
    {
      title: "DATA MARKET",
      description:
        "¡Desbloquea el potencial con Datamarket! Tu socio en la toma de decisiones empresariales. Descubre oportunidades, explora proyecciones estratégicas, mantente actualizado con las tendencias de consumo y analiza estadísticas valiosas de comercio internacional e inversión extranjera directa.",
      color: "bg-gradient-to-tr from-green-500 from-[30%] to-sky-600/80",
      boxColor: "bg-gradient-to-b from-green-500 to-sky-600",
      background: "/videos/datamarket.mp4",
      icon: "/svg/datamarketicon.svg",
      logo: "/images/logo/datamarket.svg",
      root: "/",
      visible: true,
    },
    {
      title: "SIED",
      description:
        "¡Conquista el mundo de las inversiones! Nuestro Sistema de Inteligencia de Inversión Extranjera Directa (SIED) te brinda la ventaja competitiva que necesitas. Descubre oportunidades globales, anticipa tendencias y navega por las regulaciones con facilidad para lograr inversiones exitosas.",
      color: "bg-gradient-to-tr from-[40%] from-pink-600 to-violet-800/60",
      boxColor: "bg-gradient-to-b from-pink-600 to-violet-800",
      background: "/videos/graph.mp4",
      icon: "/svg/siedicon.svg",
      logo: "/images/logo/sied.svg",
      root: "/",
      visible: true,
    },
    {
      title: "SAIM",
      description:
        "¡Domina el comercio global! Nuestro Sistema de Alertas de Inteligencia de Mercados (SAIM) te mantiene adelante en la competencia, brindándote datos cruciales sobre oportunidades emergentes y obstáculos a evitar. Impulsa tus exportaciones de manera más inteligente.",
      color: "bg-gradient-to-tr from-[40%] from-sky-500 to-purple-700/60",
      boxColor: "bg-gradient-to-b from-sky-500 to-purple-700",
      background: "/videos/rami.mp4",
      icon: "/svg/saimicon.svg",
      logo: "/images/logo/saim.svg",
      root: "/",
      visible: true,
    },
    {
      title: "RAMI",
      description:
        "¡Haz que tus exportaciones despeguen! Nuestra plataforma te lleva de la mano a través de los laberintos de regulaciones y requisitos internacionales. Accede a los mercados globales con confianza y desata el potencial oculto de tus productos desde República Dominicana.",
      color: "bg-gradient-to-tr from-[30%] from-orange-500 to-yellow-400/60",
      boxColor: "bg-gradient-to-b from-yellow-400 to-orange-500",
      background: "/videos/connection.mp4",
      icon: "/svg/ramiicon.svg",
      logo: "/images/logo/rami.svg",
      root: "/",
      visible: true,
    },
    {
      title: "SINIM",
      description:
        "El Sistema Nacional de Inteligencia de Mercados de la Dirección de Inteligencia de Mercados de ProDominicana, es un conjunto de subsistemas de alertas, oportunidades, amenazas y obstaculos que pueda enfrentar el comercio exterior y la atraccién de inversion extranjera directa (IED) de la Republica Dominicana.",
      color:
        "bg-gradient-to-br from-45% from-[#062381] via-[#2997F2]/50 to-[#1AD25D]",
      background: "/videos/charts.mp4",
      logo: "/images/logo/sinim.png",
      root: "/",
    }
  ];

  for (const tool of tools) {
    await prisma.tools.create({
      data: {
        title: tool.title,
        description: tool.description,
        color: tool.color,
        boxColor: tool.boxColor,
        background: tool.background,
        icon: tool.icon,
        logo: tool.logo,
        root: tool.root,
        visible: tool.visible,
      },
    });
  }
}

async function main() {
  await prisma.$connect();
  await seedDatabase();
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
