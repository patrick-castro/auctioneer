import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const auction = await prisma.auction.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    where: { id },
    include: {
      bids: {
        select: { price: true },
        orderBy: {
          price: 'desc',
        },
        // Takes only the bid with the highest value
        take: 1,
      },
    },
  })

  if (!auction) {
    return new NextResponse(
      JSON.stringify({ message: 'Auction does not exist' }),
      {
        status: 404,
      }
    )
  }

  const { bids, ...restOfAuction } = auction

  if (bids.length > 0) {
    restOfAuction.startPrice = bids[0].price
  }

  return new Response(JSON.stringify(restOfAuction))
}
