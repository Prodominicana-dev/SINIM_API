import { create } from 'domain';
import axios from 'axios';

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

  const countries = [{
    "name": "Canadá",
    "abbreviation": "ca",
    "continent": "America",
    "group": "NA"
},
{
    "name": "Estados Unidos",
    "abbreviation": "us",
    "continent": "America",
    "group": "NA"
},
{
    "name": "México",
    "abbreviation": "mx",
    "continent": "America",
    "group": "NA"
},
{
  "name": "Antigua y Barbuda",
  "abbreviation": "ag",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Bahamas",
  "abbreviation": "bs",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Barbados",
  "abbreviation": "bb",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Belice",
  "abbreviation": "bz",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Costa Rica",
  "abbreviation": "cr",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Cuba",
  "abbreviation": "cu",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Dominica",
  "abbreviation": "dm",
  "continent": "America",
  "group": "CA"
},
{
  "name": "El Salvador",
  "abbreviation": "sv",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Granada",
  "abbreviation": "gd",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Guatemala",
  "abbreviation": "gt",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Haití",
  "abbreviation": "ht",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Honduras",
  "abbreviation": "hn",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Jamaica",
  "abbreviation": "jm",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Nicaragua",
  "abbreviation": "ni",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Panamá",
  "abbreviation": "pa",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Puerto Rico",
  "abbreviation": "pr",
  "continent": "America",
  "group": "CA"
},
{
  "name": "República Dominicana",
  "abbreviation": "do",
  "continent": "America",
  "group": "CA"
},
{
  "name": "San Cristóbal y Nieves",
  "abbreviation": "kn",
  "continent": "America",
  "group": "CA"
},
{
  "name": "San Vicente y las Granadinas",
  "abbreviation": "vc",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Santa Lucía",
  "abbreviation": "lc",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Trinidad y Tobago",
  "abbreviation": "tt",
  "continent": "America",
  "group": "CA"
},
{
  "name": "Argentina",
  "abbreviation": "ar",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Bolivia",
  "abbreviation": "bo",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Brasil",
  "abbreviation": "br",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Chile",
  "abbreviation": "cl",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Colombia",
  "abbreviation": "co",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Ecuador",
  "abbreviation": "ec",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Guyana",
  "abbreviation": "gy",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Paraguay",
  "abbreviation": "py",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Perú",
  "abbreviation": "pe",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Surinam",
  "abbreviation": "sr",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Uruguay",
  "abbreviation": "uy",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Venezuela",
  "abbreviation": "ve",
  "continent": "America",
  "group": "SA"
},
{
  "name": "Alemania",
  "abbreviation": "de",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Austria",
  "abbreviation": "at",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Bélgica",
  "abbreviation": "be",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Bulgaria",
  "abbreviation": "bg",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Chipre",
  "abbreviation": "cy",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Croacia",
  "abbreviation": "hr",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Dinamarca",
  "abbreviation": "dk",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Eslovaquia",
  "abbreviation": "sk",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Eslovenia",
  "abbreviation": "si",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "España",
  "abbreviation": "es",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Estonia",
  "abbreviation": "ee",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Finlandia",
  "abbreviation": "fi",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Francia",
  "abbreviation": "fr",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Grecia",
  "abbreviation": "gr",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Hungría",
  "abbreviation": "hu",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Irlanda",
  "abbreviation": "ie",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Italia",
  "abbreviation": "it",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Letonia",
  "abbreviation": "lv",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Lituania",
  "abbreviation": "lt",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Luxemburgo",
  "abbreviation": "lu",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Malta",
  "abbreviation": "mt",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Países Bajos",
  "abbreviation": "nl",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Polonia",
  "abbreviation": "pl",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Portugal",
  "abbreviation": "pt",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "República Checa",
  "abbreviation": "cz",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Rumania",
  "abbreviation": "ro",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Suecia",
  "abbreviation": "se",
  "group": "ue",
  "continent": "Europe"
},
{
  "name": "Reino Unido",
  "abbreviation": "gb",
  "continent": "Europe"
},
{
  "name": "Albania",
  "abbreviation": "al",
  "continent": "Europe"
},
{
  "name": "Andorra",
  "abbreviation": "ad",
  "continent": "Europe"
},
{
  "name": "Bielorrusia",
  "abbreviation": "by",
  "continent": "Europe"
},
{
  "name": "Bosnia y Herzegovina",
  "abbreviation": "ba",
  "continent": "Europe"
},
{
  "name": "Georgia",
  "abbreviation": "ge",
  "continent": "Europe"
},
{
  "name": "Islandia",
  "abbreviation": "is",
  "continent": "Europe"
},
{
  "name": "Kosovo",
  "abbreviation": "xk",
  "continent": "Europe"
},
{
  "name": "Liechtenstein",
  "abbreviation": "li",
  "continent": "Europe"
},
{
  "name": "Macedonia del Norte",
  "abbreviation": "mk",
  "continent": "Europe"
},
{
  "name": "Moldavia",
  "abbreviation": "md",
  "continent": "Europe"
},
{
  "name": "Mónaco",
  "abbreviation": "mc",
  "continent": "Europe"
},
{
  "name": "Montenegro",
  "abbreviation": "me",
  "continent": "Europe"
},
{
  "name": "Noruega",
  "abbreviation": "no",
  "continent": "Europe"
},
{
  "name": "Rusia",
  "abbreviation": "ru",
  "continent": "Europe"
},
{
  "name": "San Marino",
  "abbreviation": "sm",
  "continent": "Europe"
},
{
  "name": "Serbia",
  "abbreviation": "rs",
  "continent": "Europe"
},
{
  "name": "Suiza",
  "abbreviation": "ch",
  "continent": "Europe"
},
{
  "name": "Ucrania",
  "abbreviation": "ua",
  "continent": "Europe"
},
{
  "name": "Vaticano",
  "abbreviation": "va",
  "continent": "Europe"
},
{
  "name": "Afganistán",
  "abbreviation": "af",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Arabia Saudita",
  "abbreviation": "sa",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Armenia",
  "abbreviation": "am",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Azerbaiyán",
  "abbreviation": "az",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Bangladesh",
  "abbreviation": "bd",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Baréin",
  "abbreviation": "bh",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Birmania (Myanmar)",
  "abbreviation": "mm",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Brunéi",
  "abbreviation": "bn",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Bután",
  "abbreviation": "bt",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Camboya",
  "abbreviation": "kh",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Catar",
  "abbreviation": "qa",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "China",
  "abbreviation": "cn",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Corea del Norte",
  "abbreviation": "kp",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Corea del Sur",
  "abbreviation": "kr",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Emiratos Árabes Unidos",
  "abbreviation": "ae",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Filipinas",
  "abbreviation": "ph",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "India",
  "abbreviation": "in",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Indonesia",
  "abbreviation": "id",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Irak",
  "abbreviation": "iq",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Irán",
  "abbreviation": "ir",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Israel",
  "abbreviation": "il",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Japón",
  "abbreviation": "jp",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Jordania",
  "abbreviation": "jo",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Kazajistán",
  "abbreviation": "kz",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Kirguistán",
  "abbreviation": "kg",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Kuwait",
  "abbreviation": "kw",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Laos",
  "abbreviation": "la",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Líbano",
  "abbreviation": "lb",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Malasia",
  "abbreviation": "my",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Maldivas",
  "abbreviation": "mv",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Mongolia",
  "abbreviation": "mn",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Nepal",
  "abbreviation": "np",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Omán",
  "abbreviation": "om",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Pakistán",
  "abbreviation": "pk",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Palestina",
  "abbreviation": "ps",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Singapur",
  "abbreviation": "sg",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Siria",
  "abbreviation": "sy",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Sri Lanka",
  "abbreviation": "lk",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Tailandia",
  "abbreviation": "th",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Tayikistán",
  "abbreviation": "tj",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Turkmenistán",
  "abbreviation": "tm",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Turquía",
  "abbreviation": "tr",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Uzbekistán",
  "abbreviation": "uz",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Vietnam",
  "abbreviation": "vn",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Yemen",
  "abbreviation": "ye",
  "group": "AS",
  "continent": "Asia"
},
{
  "name": "Angola",
  "abbreviation": "ao",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Argelia",
  "abbreviation": "dz",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Benín",
  "abbreviation": "bj",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Botsuana",
  "abbreviation": "bw",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Burkina Faso",
  "abbreviation": "bf",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Burundi",
  "abbreviation": "bi",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Cabo Verde",
  "abbreviation": "cv",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Camerún",
  "abbreviation": "cm",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Chad",
  "abbreviation": "td",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Comoras",
  "abbreviation": "km",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Congo",
  "abbreviation": "cg",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Congo (Rep. Dem.)",
  "abbreviation": "cd",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Costa de Marfil",
  "abbreviation": "ci",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Egipto",
  "abbreviation": "eg",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Eritrea",
  "abbreviation": "er",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Esuatini",
  "abbreviation": "sz",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Etiopía",
  "abbreviation": "et",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Gabón",
  "abbreviation": "ga",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Gambia",
  "abbreviation": "gm",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Ghana",
  "abbreviation": "gh",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Guinea",
  "abbreviation": "gn",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Guinea Ecuatorial",
  "abbreviation": "gq",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Guinea-Bisáu",
  "abbreviation": "gw",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Kenia",
  "abbreviation": "ke",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Lesoto",
  "abbreviation": "ls",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Liberia",
  "abbreviation": "lr",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Libia",
  "abbreviation": "ly",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Madagascar",
  "abbreviation": "mg",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Malawi",
  "abbreviation": "mw",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Mali",
  "abbreviation": "ml",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Marruecos",
  "abbreviation": "ma",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Mauricio",
  "abbreviation": "mu",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Mauritania",
  "abbreviation": "mr",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Mozambique",
  "abbreviation": "mz",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Namibia",
  "abbreviation": "na",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Níger",
  "abbreviation": "ne",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Nigeria",
  "abbreviation": "ng",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Ruanda",
  "abbreviation": "rw",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Sahara Occidental",
  "abbreviation": "eh",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Santa Elena, Ascensión y Tristán de Acuña",
  "abbreviation": "sh",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Santo Tomé y Príncipe",
  "abbreviation": "st",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Senegal",
  "abbreviation": "sn",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Seychelles",
  "abbreviation": "sc",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Sierra Leona",
  "abbreviation": "sl",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Somalia",
  "abbreviation": "so",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Sudáfrica",
  "abbreviation": "za",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Sudán",
  "abbreviation": "sd",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Sudán del Sur",
  "abbreviation": "ss",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Tanzania",
  "abbreviation": "tz",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Togo",
  "abbreviation": "tg",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Túnez",
  "abbreviation": "tn",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Uganda",
  "abbreviation": "ug",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Yibuti",
  "abbreviation": "dj",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Zambia",
  "abbreviation": "zm",
  "group": "AF",
  "continent": "Africa"
},
{
  "name": "Australia",
  "abbreviation": "au",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Fiyi",
  "abbreviation": "fj",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Islas Cook",
  "abbreviation": "ck",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Islas Feroe",
  "abbreviation": "fo",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Islas Marshall",
  "abbreviation": "mh",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Islas Salomón",
  "abbreviation": "sb",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Islas Vírgenes de los Estados Unidos",
  "abbreviation": "vi",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Islas Vírgenes Británicas",
  "abbreviation": "vg",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Kiribati",
  "abbreviation": "ki",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Micronesia",
  "abbreviation": "fm",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Nauru",
  "abbreviation": "nr",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Niue",
  "abbreviation": "nu",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Nueva Caledonia",
  "abbreviation": "nc",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Nueva Zelanda",
  "abbreviation": "nz",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Palau",
  "abbreviation": "pw",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Papúa Nueva Guinea",
  "abbreviation": "pg",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Polinesia Francesa",
  "abbreviation": "pf",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Samoa",
  "abbreviation": "ws",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Timor Oriental",
  "abbreviation": "tl",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Tonga",
  "abbreviation": "to",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Tuvalu",
  "abbreviation": "tv",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Vanuatu",
  "abbreviation": "vu",
  "group": "OC",
  "continent": "Oceania"
},
{
  "name": "Wallis y Futuna",
  "abbreviation": "wf",
  "group": "OC",
  "continent": "Oceania"
}

]
  
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
