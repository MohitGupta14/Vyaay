import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  try {
    // A simple connection test, using `.$queryRaw` to check if the connection works
    await prisma.$queryRaw`SELECT 1`;

    return (
      <main>
        <div>Prisma is connected to the PostgreSQL database!</div>
      </main>
    );
  } catch (error) {
    console.error('Error connecting to the database:', error);

    return (
      <main>
        <div>Failed to connect to the PostgreSQL database.</div>
      </main>
    );
  } finally {
    await prisma.$disconnect();
  }
}
