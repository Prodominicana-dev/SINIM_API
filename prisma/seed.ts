const { exec } = require('child_process');
const util = require('util');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const products = require('../public/data/Products.json');
const countries = require('../public/data/Countries.json');
const domains = require('../public/data/Domains.json');
const tools = require('../public/data/Tools.json');

//RAMI
const tradeAgreement = require('../public/data/AcuerdoComercial.json');
const tariffs = require('../public/data/ArancelesImpuestos.json');
const webResource = require('../public/data/RecursoWeb.json');
const technicalRequirements = require('../public/data/RegulacionesTecnicas.json');
const outputRequirement = require('../public/data/RequisitoSalida.json');
const importRequirement = require('../public/data/RequisitosImportacion.json');
//SAIM
const saims = require('../public/data/SAIM.json');
const axios = require('axios');
// DATAMARKET
const datamarket = require('../public/data/Datamarket.json');


//Links
const productURL = 'http://127.0.0.1:3001/apiv2/products';
const countryURL = 'http://127.0.0.1:3001/apiv2/countries';
const ramisURL = 'http://127.0.0.1:3001/apiv2/rami';

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

  //Crear categorias por plataforma
  const categories = [{
    name: "Oportunidades",
    platform: "saim"
  },
  {
    name: "Actualizaciones",
    platform: "saim"
  },
  {
    name: "Amenazas",
    platform: "saim"
  },
  {
    name: "Obstáculos",
    platform: "saim"
  },
  {
    name: "Oportunidades",
    platform: "sied"
  },
  {
    name: "Tendencias",
    platform: "sied"
  },
  {
    name: "Normativas",
    platform: "sied"
  },
  {
    name: "Amenazas",
    platform: "sied"
  },
]

// crear categorias
  for( const category of categories ){
    await prisma.category.create({
      data: {
        name: category.name,
        platform: category.platform
      }
    })
  }

  const categoriesSaim = await prisma.category.findMany({})

  // Crear productos
  for(const product of products){
    
    await prisma.product.create({
      data: {
        name: product.Producto,
        code: product.SubPartida,
        oldID: product.Id 
      }
    })
        
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
  let id;
    for(const category of categoriesSaim){
      if(category.name == s.Clasificacion && category.platform == "saim"){
        id = category.id;
        continue
      }
    }
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
      ...productID
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
  await prisma.alerts.create({
    data: {
      title: s.Titular,
      description: s.Contenido,
      categoryId: id,
      image: s.Imagen,
      products: productsJSON,
      countries: countriesJSON,
      platform: "saim",
      oldID: s.Id
    }
  })
}

// Datamarket

for(const data of datamarket){
  await prisma.datamarket.create({
    data: {
      title: data.Seccion,
      category: data.Cat ? data.Cat : data.Seccion,
      url: data.Url
    }
  }) 
}

}

function executeCommandAsync(command: string): Promise<{ stdout: string, stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  const execAsync = util.promisify(exec);
  await prisma.$connect();
  try {
    const { stdout, stderr } = await executeCommandAsync('npx prisma db push');
    console.log(`Salida: ${stdout}`);
    if (stderr) {
      console.error(`Error: ${stderr}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  await seedDatabase();
  await axios.get("http://127.0.0.1:3001/apiv2/data/newImages");
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

