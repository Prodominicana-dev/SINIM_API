

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const products = require('../src/data/Products.json');
const countries = require('../src/data/Countries.json');
const domains = require('../src/data/Domains.json');
const tools = require('../src/data/Tools.json');
//RAMI
const sectors = require('../src/data/Sector.json');
const tradeAgreement = require('../src/data/AcuerdoComercial.json');
const tariffs = require('../src/data/ArancelesImpuestos.json');
const webResource = require('../src/data/RecursoWeb.json');
const technicalRequirements = require('../src/data/RegulacionesTecnicas.json');
const outputRequirement = require('../src/data/RequisitoSalida.json');
const importRequirement = require('../src/data/RequisitosImportacion.json');
//SAIM
const saims = require('../src/data/SAIM.json');
const files = require('../src/data/Archivos.json');
const axios = require('axios');

//Links
const sectorURL = 'https://sinim-api.vercel.app/sector';
const productURL = 'https://sinim-api.vercel.app/products';
const countryURL = 'https://sinim-api.vercel.app/countries';
const ramisURL = 'https://sinim-api.vercel.app/rami';

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
await axios.get(productURL).then((response) => {
  productsRami = response.data;
});

const getProductId = async (id) => {
  for(const product of productsRami){
    if(product.oldID == id){
      return product.id;
    }
  }
}


for(const trade of tradeAgreement){
  const productID = await getProductId(trade.Id_Producto);
  await prisma.ramis.create({
    data: {
      productId: productID,
      countryId: trade.IdPais,
      tradeAgreement: trade.AcuerdoComercial,
    }
  })
}

let ramis;
await axios.get(ramisURL).then((response) => {
  ramis = response.data;
});
const getRAMIId = async (pid, cid) => {
  for(const rami of ramis){
    if(rami.productId == pid && rami.countryId == cid){
      return rami.id;
    }
  }
}

// Agregar Aranceles Impuestos a cada RAMI
for(const tariff of tariffs){
  const productId = await getProductId(tariff.Id_Producto);
  const ramiID = await getRAMIId(productId, tariff.IdPais);
  if(ramiID == undefined){
    continue;
  }
  await prisma.ramis.update({
    where: {
      id: ramiID
    },
    data: {
      
      tariffsImposed: tariff.ArancelesImpuesto,
      
    }
  })
}

// Agregar Recursos Web a cada RAMI
for(const web of webResource){
  const productId = await getProductId(web.Id_Producto);
  const ramiID = await getRAMIId(productId, web.IdPais);
  if(ramiID == undefined){
    continue;
  }
  await prisma.ramis.update({
    where: {
      id: ramiID
    },
    data: {
      webResource: web.Recurso,
    }
  })
}

// Agregar Regulaciones Tecnicas a cada RAMI
for(const tech of technicalRequirements){
  const productId = await getProductId(tech.Id_Producto);
  const ramiID = await getRAMIId(productId, tech.IdPais);
  if(ramiID == undefined){
    continue;
  }
  await prisma.ramis.update({
    where: {
      id: ramiID
    },
    data: {
      technicalRequirements: tech.RequisitosTecnicos,
      permitsCertifications: tech.PermisosCertificaciones,
      labelingCertifications: tech.EtiquetadoCertificado
    }
  })
}

// Agregar Requisitos de Salida a cada RAMI
for(const output of outputRequirement){
  const productId = await getProductId(output.Id_Producto);
  const ramiID = await getRAMIId(productId, output.IdPais);
  if(ramiID == undefined){
    continue;
  }
  await prisma.ramis.update({
    where: {
      id: ramiID
    },
    data: {
      outputRequirement: output.ResquisitoSalida
    }
  })
}

// Agregar Requisitos de Importacion a cada RAMI
for(const input of importRequirement){
  const productId = await getProductId(input.Id_Producto);
  const ramiID = await getRAMIId(productId, input.IdPais);
  if(ramiID == undefined){
    continue;
  }
  await prisma.ramis.update({
    where: {
      id: ramiID
    },
    data: {
      importRequirement: input.RequisitoImportacion
    }
  })
}

// SAIM
// Agregar SAIM's
for(const s of saims){
  // Separar productos para crear un JSON con todos los productos y codigo arancelario de c/u
  const products = s.Productos.split(',');
  const productsJSON = [];
  for(const product of products){
    const productID = await prisma.product.findFirst({
      where: {
        name: product
      }
    })
    if(productID == null){
      continue;
    }
    productsJSON.push({
      name: productID.name,
      code: productID.code,
    })
  }
  // Separar paises y crear JSON con todos sus datos
  const countries = s.Pais.split(',');
  const countriesJSON = [];
  for(const country of countries){
    const countryID = await prisma.country.findFirst({
      where: {
        name: country
      }
    })
    if(countryID == null){
      continue;
    }
    countriesJSON.push({
      ...countryID
    })
  }
  await prisma.saim.create({
    data: {
      title: s.Titular,
      description: s.Contenido,
      category: s.Clasificacion,
      source: s.Fuente,
      link: s.Link,
      image: s.Imagen,
      products: productsJSON,
      countries: countriesJSON,
      oldID: s.Id
    }
  })
}

// Archivos a cada SAIM
for(const file of files){
  const saimID = await prisma.saim.findFirst({
    where: {
      oldID: file.Id_SAIM
    }
  })
  if(saimID == null){
    continue;
  }
  await prisma.saim.update({
    where: {
      id: saimID.id
    },
    data: {
      files: [file.Archivo]
    }
  })
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
