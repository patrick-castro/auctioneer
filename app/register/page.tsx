'use client'

import Link from 'next/link'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Register() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch('http://localhost:3000/api/user', {
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

    await signIn('credentials', {
      username: email,
      password: password,
      redirect: true,
      callbackUrl: '/auction',
    })
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

        <button
          className='btn btn-primary w-full mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md py-4'
          type='submit'
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
