'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import cn from 'classnames'

const appUrl = process.env.NEXT_PUBLIC_APP_URL

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { status } = useSession()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email')
      const password = formData.get('password')

      const res = await fetch(`${appUrl}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await res.json()

      if (result.error) {
        throw new Error(result.error)
      }

      await signIn('credentials', {
        username: email,
        password: password,
        redirect: true,
        callbackUrl: '/auction',
      })
    } catch (error) {
      setError('Email already exists')
    } finally {
      setIsLoading(false)
    }
  }

  if (!status || status === 'loading') return

  if (status === 'authenticated') {
    return (
      <div className='login-form'>
        <h1 className='text-2xl font-semibold mb-5'>
          You are already registered!
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
        <h1 className='text-2xl font-semibold mb-2'>Register to Auctioneer</h1>
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
          />
        </div>

        {!!error && <p className='text-red-600'>{error}</p>}

        <button
          className={cn(
            'btn btn-primary w-full mt-8 text-white bg-blue-500 rounded-md py-4',
            { 'opacity-75': isLoading, 'hover:bg-blue-600': !isLoading }
          )}
          type='submit'
          disabled={isLoading}
        >
          Register
        </button>
      </form>

      <div>
        <p className='text-center pt-8'>
          Already have an account?{' '}
          <Link href='/login' className='text-blue-700'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
