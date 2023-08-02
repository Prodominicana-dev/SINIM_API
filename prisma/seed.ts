const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDatabase() {
  // Roles y Permisos
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      permissions: {
        create: [
          { name: 'Crear Usuarios' },
          { name: 'Eliminar Usuarios' },
          { name: 'Editar Usuarios' },
        ],
      },
      users: {
        create: [
          {
            name: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'hashedPassword1',
            status: 'active',
          },
          {
            name: 'Jane',
            lastname: 'Smith',
            email: 'jane.smith@example.com',
            password: 'hashedPassword2',
            status: 'active',
          },
        ],
      },
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'User',
      permissions: {
        create: [{ name: 'Ver Usuarios' }],
      },
      users: {
        create: [
          {
            name: 'Alice',
            lastname: 'Johnson',
            email: 'alice.johnson@example.com',
            password: 'hashedPassword3',
            status: 'active',
          },
        ],
      },
    },
  });

  // Países y Productos
  const usa = await prisma.country.create({
    data: {
      name: 'United States',
      flag: 'usa.png',
    },
  });

  const canada = await prisma.country.create({
    data: {
      name: 'Canada',
      flag: 'canada.png',
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'Product 1',
      description: 'Description for Product 1',
      subHeading: 'Subheading for Product 1',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Product 2',
      description: 'Description for Product 2',
      subHeading: 'Subheading for Product 2',
    },
  });

  // Ramis
  await prisma.ramis.create({
    data: {
      sector: 'Sector 1',
      countryId: usa.id,
      productId: product1.id,
    },
  });

  await prisma.ramis.create({
    data: {
      sector: 'Sector 2',
      countryId: canada.id,
      productId: product2.id,
    },
  });
}

seedDatabase()
  .then(() => {
    console.log('Datos insertados correctamente.');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error al insertar datos:', error);
    prisma.$disconnect();
  });
