import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const filter = request.nextUrl.searchParams.get('filter')
  // TODO: Add condition for filtering ongoing and completed
  const auctions = await prisma.auction.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return new Response(JSON.stringify(auctions))
}
