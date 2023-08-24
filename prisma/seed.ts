import { create } from 'domain';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDatabase() {
  // Dominios reservados
  const domains = [
    {
      name: 'gob.do',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'gov.do',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'adoexpo.org',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'jad.org.do',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'asiex.org',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'amcham.org.do',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'camarasantodomingo.do',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'camarasantiago.com',
      platform: 'saim',
      role: { create: { role: { connect: { id: 3 } } } },
    },
    {
      name: 'gov.do',
      platform: 'sied',
      role: { create: { role: { connect: { id: 4 } } } },
    },
    {
      name: 'gob.do',
      platform: 'sied',
      role: { create: { role: { connect: { id: 4 } } } },
    },
    {
      name: 'asiex.org',
      platform: 'sied',
      role: { create: { role: { connect: { id: 4 } } } },
    },
    {
      name: 'adoexpo.org',
      platform: 'sied',
      role: { create: { role: { connect: { id: 4 } } } },
    },
    {
      name: 'amcham.org.do ',
      platform: 'sied',
      role: { create: { role: { connect: { id: 4 } } } },
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
