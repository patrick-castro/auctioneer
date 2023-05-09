import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const auctions = await prisma.auction.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return new Response(JSON.stringify(auctions))
}
