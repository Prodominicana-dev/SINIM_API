import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'
import { convertHtmlToDelta } from 'node-quill-converter';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const products = require('../public/data/Products.json');
const countries = require('../public/data/Countries.json');
const domains = require('../public/data/Domains.json');
const tools = require('../public/data/Tools.json');
//RAMI
const sectors = require('../public/data/Sector.json');
const tradeAgreement = require('../public/data/AcuerdoComercial.json');
const tariffs = require('../public/data/ArancelesImpuestos.json');
const webResource = require('../public/data/RecursoWeb.json');
const technicalRequirements = require('../public/data/RegulacionesTecnicas.json');
const outputRequirement = require('../public/data/RequisitoSalida.json');
const importRequirement = require('../public/data/RequisitosImportacion.json');
//SAIM
const saims = require('../public/data/SAIM.json');
const files = require('../public/data/Archivos.json');

const axios = require('axios');

//Links
const sectorURL = 'https://sinim-api-git-tools-prodominicanadev.vercel.app/sector';
const productURL = 'https://sinim-api-git-tools-prodominicanadev.vercel.app/products';
const countryURL = 'https://sinim-api-git-tools-prodominicanadev.vercel.app/countries';
const ramisURL = 'https://sinim-api-git-tools-prodominicanadev.vercel.app/rami';

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
      tradeAgreement: NodeHtmlMarkdown.translate(trade.AcuerdoComercial),
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
      
      tariffsImposed: NodeHtmlMarkdown.translate(tariff.ArancelesImpuesto),
      
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
      webResource: NodeHtmlMarkdown.translate(web.Recurso),
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
      technicalRequirements: NodeHtmlMarkdown.translate(tech.RequisitosTecnicos),
      permitsCertifications: NodeHtmlMarkdown.translate(tech.PermisosCertificaciones),
      labelingCertifications: NodeHtmlMarkdown.translate(tech.EtiquetadoCertificado)
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
      outputRequirement: NodeHtmlMarkdown.translate(output.ResquisitoSalida)
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
      importRequirement: NodeHtmlMarkdown.translate(input.RequisitoImportacion)
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
      description: NodeHtmlMarkdown.translate(s.Contenido),
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
console.log(convertHtmlToDelta(`<p>Con el objetivo de promover un mayor crecimiento en las exportaciones de cigarros desde la Rep&uacute;blica Dominicana, ProDominicana, a partir de un an&aacute;lisis de los datos de TradeMap, genera esta alerta destinada especialmente para el sector exportador&nbsp;de tabaco, identificando potenciales compradores en base a tres niveles diferentes:&nbsp;</p>

<p><strong>1. Grandes compradores internacionales de cigarros&nbsp;(crecimiento en sus importaciones).</strong></p>

<p>Entre los principales compradores internacionales de cigarros durante el 2022, ProDominicana identific&oacute; 3 mercados como potenciales compradores, a partir del crecimiento en sus importaciones.&nbsp;</p>

<table border="1" cellpadding="1" cellspacing="1" style="width:500px">
<tbody>
<tr>
<td colspan="3">
<p><strong>Principales compradores internacionales 2022&nbsp;</strong></p>
</td>
</tr>
<tr>
<td style="text-align:center; vertical-align:middle">
<p><strong>Pa&iacute;s</strong></p>
</td>
<td style="text-align:left; vertical-align:middle">
<p><strong>Importaciones&nbsp;<br />
(US$ Millones)&nbsp; &nbsp;&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p><strong>Crecimiento Interanual</strong></p>
</td>
</tr>
<tr>
<td>
<p><strong>Italia</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>183.3</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>132%</p>
</td>
</tr>
<tr>
<td>
<p><strong>Reino Unido</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>72.1</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>40%</p>
</td>
</tr>
<tr>
<td>
<p><strong>Hong Kong</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>93.4</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>8%</p>
</td>
</tr>
</tbody>
</table>

<p>&nbsp;</p>

<p><strong>2. Potenciales compradores de cigarros (socios comerciales).</strong></p>

<p>Entre todos los mercados preferenciales de la Rep&uacute;blica Dominicana, a partir de altas tasas de crecimiento en las compras internacionales de esos productos durante el 2022, ProDominicana identific&oacute; 5&nbsp;mercados como potenciales compradores:&nbsp;</p>

<table border="1" cellpadding="1" cellspacing="1" style="width:500px">
<tbody>
<tr>
<td colspan="3">
<p><strong>Potenciales Compradores &nbsp;</strong><br />
(Socios comerciales)&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Pa&iacute;s&nbsp;</strong></p>
</td>
<td>
<p><strong>Importaciones&nbsp;<br />
(US$ Millones)&nbsp;</strong></p>
</td>
<td>
<p><strong>Crecimiento Interanual&nbsp;</strong></p>
</td>
</tr>
<tr>
<td>
<p><strong>Italia&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>183.3&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>132%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Eslovaquia&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>30.3&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>103%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Nicaragua&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>9.6&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>65%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Reino Unido&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>72.1&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>40%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Polonia&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>9.1&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>16%&nbsp;</p>
</td>
</tr>
</tbody>
</table>

<p><strong>3. Potenciales compradores de cigarros&nbsp;(mercados extra regionales).</strong></p>

<p>Entre los mercados extra regionales de la Rep&uacute;blica Dominicana, a partir de altas tasas de crecimiento en las compras internacionales durante el 2022, ProDominicana identific&oacute; 7&nbsp;mercados como potenciales compradores:&nbsp;</p>

<table border="1" cellpadding="1" cellspacing="1" style="width:500px">
<tbody>
<tr>
<td colspan="3">
<p><strong>Potenciales Compradores &nbsp;</strong><br />
(Mercados Extraregionales)&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Pa&iacute;s&nbsp;</strong></p>
</td>
<td>
<p><strong>Importaciones&nbsp;<br />
(US$ Millones)&nbsp;</strong></p>
</td>
<td>
<p><strong>Crecimiento Interanual&nbsp;</strong></p>
</td>
</tr>
<tr>
<td>
<p><strong>Marruecos&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>12,8&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>227%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Andorra&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>6.5&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>82%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Macao China&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>37.5&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>59%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>China&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>9,7&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>25%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Emiratos &Aacute;rabes Unidos&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>21&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>35%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Taipei Chino&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>9.2&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>18%&nbsp;</p>
</td>
</tr>
<tr>
<td>
<p><strong>Australia&nbsp;</strong></p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>17.4&nbsp;</p>
</td>
<td style="text-align:center; vertical-align:middle">
<p>16%&nbsp;</p>
</td>
</tr>
</tbody>
</table>

<p>&nbsp;</p>
`))  //await seedDatabase();
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
