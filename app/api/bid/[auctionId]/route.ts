import { verifyJwt } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    auctionId: string
  }
}

export async function POST(
  request: Request,
  { params: { auctionId } }: Params
) {
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

  const { id: userId } = jwt
  const body = await request.json()

  await prisma.bid.create({
    data: {
      price: parseFloat(body.price),
      bidder: { connect: { id: userId } },
      auction: { connect: { id: auctionId } },
    },
  })

  return new NextResponse(
    JSON.stringify({ message: 'Successfully created bid' })
  )
}
