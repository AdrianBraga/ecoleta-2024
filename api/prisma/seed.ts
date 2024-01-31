import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.ItemCreateInput[] = [
  { title: 'Lâmpadas', image: 'lampadas.svg' },
  { title: 'Pilhas e Baterias', image: 'baterias.svg' },
  { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
  { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
  { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
  { title: 'Óleo de Cozinha', image: 'oleo.svg' },
]

async function main() {
  console.log(`Start seeding...`)
  for (const seed of userData) {
    const item = await prisma.item.create({
      data: seed
    })
    console.log(`Created item with title: ${item.title}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect
    process.exit(1)
  })