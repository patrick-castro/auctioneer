import { verifyJwt } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

interface RequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    })

    const { password, ...result } = user

    return new Response(JSON.stringify(result))
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return new NextResponse(
        JSON.stringify({
          error: 'Email already exists',
        }),
        {
          status: 409,
        }
      )
    }
  }
}

export async function PUT(request: Request) {
  const accessToken = request.headers.get('authorization') || ''
  const jwt = verifyJwt(accessToken)

  if (!accessToken || !jwt) {
    return new NextResponse(
      JSON.stringify({
        error: 'Unauthorized',
      }),
      {
        status: 401,
      }
    )
  }

  const body: { amount: string } = await request.json()
  const { id: userId, balance } = jwt
  const totalBalance = parseFloat(balance) + parseFloat(body.amount)

  await prisma.user.update({
    data: {
      balance: totalBalance,
    },
    where: {
      id: userId,
    },
  })

  return new NextResponse(
    JSON.stringify({ message: 'successfully updated user' })
  )
}
