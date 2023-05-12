import { verifyJwt } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get('authorization') || ''
  const jwt = verifyJwt(accessToken)

  if (!accessToken || !jwt) {
    return new NextResponse(
      JSON.stringify({
        error: 'unauthorized',
      }),
      {
        status: 401,
      }
    )
  }

  const filter = request.nextUrl.searchParams.get('filter')
  const currentDateTime = dayjs().toDate()

  let whereCondition = {}

  if (filter === 'ongoing') {
    whereCondition = {
      timeWindow: {
        gte: currentDateTime,
      },
    }
  }

  if (filter === 'completed') {
    whereCondition = {
      timeWindow: {
        lt: currentDateTime,
      },
    }
  }

  const auctions = await prisma.auction.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: whereCondition,
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

  const mappedAuctions = auctions.map((auction) => {
    const { bids, ...restOfAuction } = auction

    // Update startPrice value if the highest bid has a higher value
    if (bids.length > 0 && bids[0].price > restOfAuction.startPrice) {
      restOfAuction.startPrice = bids[0].price
    }

    return restOfAuction
  })

  return new Response(JSON.stringify(mappedAuctions))
}

export async function POST(request: Request) {
  const accessToken = request.headers.get('authorization') || ''
  const jwt = verifyJwt(accessToken)

  if (!accessToken || !jwt) {
    return new NextResponse(
      JSON.stringify({
        error: 'unauthorized',
      }),
      {
        status: 401,
      }
    )
  }

  const body = await request.json()

  const { id: userId } = jwt

  await prisma.auction.create({
    data: {
      ...body,
      startPrice: parseFloat(body.startPrice as string),
      owner: { connect: { id: userId } },
    },
  })

  return new NextResponse(
    JSON.stringify({ message: 'Successfully created user' })
  )
}
