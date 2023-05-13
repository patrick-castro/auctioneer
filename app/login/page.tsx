'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Login({ searchParams }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession()

  const username = useRef('')
  const password = useRef('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    await signIn('credentials', {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/auction',
    })

    setIsLoading(false)
  }

  const hasError = !!searchParams?.error

  if (!status || status === 'loading') return

  if (status === 'authenticated') {
    return (
      <div className='login-form'>
        <h1 className='text-2xl font-semibold mb-5'>
          You are already logged in!
        </h1>
        <Link href='/auction' className='underline text-blue-600'>
          Go back to Auctions page
        </Link>
      </div>
    )
  }

  return (
    <div className='login-form'>
      <div className='pb-4'>
        <h1 className='text-2xl font-semibold mb-2'>Login to Auctioneer</h1>
        <p>Winning is just a bid away!</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Email Address<span className='text-red-500 text-sm'>*</span>
          </p>
          <input
            type='email'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
            name='email'
            onChange={(e) => (username.current = e.target.value)}
          />
        </div>

        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Password<span className='text-red-500 text-sm'>*</span>
          </p>
          <input
            type='password'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
            name='password'
            onChange={(e) => (password.current = e.target.value)}
          />
        </div>

        {hasError && <p className='text-red-600'>Invalid credentials</p>}

        <button
          className='btn btn-primary w-full mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md py-4'
          type='submit'
          disabled={isLoading}
        >
          Log in
        </button>
      </form>

      <div>
        <p className='text-center pt-8'>
          Not on Auctioneer yet?{' '}
          <Link href='/register' className='text-blue-700'>
            Register now!
          </Link>
        </p>
      </div>
    </div>
  )
}
