'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FormEvent, useRef } from 'react'

export default function Login() {
  const username = useRef('')
  const password = useRef('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/auction',
    })

    // CHECK IF RESULT IS UNDEFINED
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

        <button
          className='btn btn-primary w-full mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md py-4'
          type='submit'
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
