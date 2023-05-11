import { verifyJwt } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
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
  })

  return new Response(JSON.stringify(auctions))
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
