

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const products = require('../src/data/Products.json');
const countries = require('../src/data/Countries.json');
const domains = require('../src/data/Domains.json');
const tools = require('../src/data/Tools.json');
const sectors = require('../src/data/Sector.json');
const tradeAgreement = require('../src/data/AcuerdoComercial.json');
const axios = require('axios');

//Links
const sectorURL = 'https://sinim-api-git-tools-prodominicanadev.vercel.app/sector';
const productURL = 'https://sinim-api-git-tools-prodominicanadev.vercel.app/products';
const countryURL = 'https://sinim-api-git-tools-prodominicanadev.vercel.app/countries';

async function seedDatabase() {
  // Dominios reservados

  for (const domain of domains) {
    await prisma.reservedDomains.create({
      data: {
        name: domain.name,
        platform: domain.platform,
      },
    });
  }

  // Herramientas (RAMI, SIED, SAIM, DATAMARKET, SINIM)
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

  // Sectores
  for(const sector of sectors){
    await prisma.sector.create({
      data: {
        name: sector.name,
        oldID: sector.oldID
      }
    })
  }
  // Buscar los sectores registrados para asignarle a los productos al momento de migrar los datos a la nueva BD y de esta
  // manera se actualicen los id de los sectores en la tabla de productos
  let sector;
  await axios.get(sectorURL).then((response) => {
    sector = response.data;
  });

  // Crear productos
  for(const product of products){
    for(const s of sector){
      if(product.Id_Sector == s.oldID){
        await prisma.product.create({
          data: {
            name: product.Producto,
            code: product.SubPartida,
            description: product.Descripcion,
            sectorID: s.id,
            oldID: product.Id 
          }
        })
        continue;
      }
    }
  }

for(const country of countries){
  await prisma.country.create({
    data: {
      name: country.name,
      abbreviation: country.abbreviation,
      continent: country.continent,
      group: country.group
    },
  });
}

// Acuerdo comercial en rami
let productsRami;
let countriesRami;

   
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
