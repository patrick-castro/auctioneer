'use client'

import { FormEvent, useState } from 'react'
import './styles.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import bidInAuction from '@/utils/bidInAuction'
import cn from 'classnames'

interface Params {
  params: {
    id: string
  }
}

export default function NewBid({ params: { id } }: Params) {
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session?.user) {
      throw new Error('No user session')
    }

    const { accessToken, balance } = session.user

    const formData = new FormData(e.currentTarget)
    const amount = formData.get('amount') as string

    if (!amount) {
      setError('Please enter a valid amount')
      return
    }

    if (parseFloat(amount) < parseFloat(balance)) {
      setError('Insufficient balance to bid')
      return
    }

    await bidInAuction(id, amount, accessToken)
    router.push('/auction')
  }

  return (
    <div className='login-form'>
      <div className='pb-8'>
        <h1 className='text-2xl font-semibold'>Bid for this Item</h1>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='flex'>
          <label className='font-semibold w-1/3 text-gray-700'>Name:</label>
          <p className='w-2/3'>Gaming Computer</p>
        </span>
        <span className='flex'>
          <label className='font-semibold w-1/3 text-gray-700'>
            Current Price:
          </label>
          <p className='w-2/3'>$1000.00</p>
        </span>
        <span className='flex'>
          <label className='font-semibold w-1/3 text-gray-700'>Duration:</label>
          <p className='w-2/3'>1 hour and 56 mins</p>
        </span>
      </div>

      <form onSubmit={onSubmit}>
        <div className='mt-8'>
          <p
            className={cn('text-sm font-semibold mb-2 text-gray-700', {
              'text-red-600': !!error,
            })}
          >
            Amount
          </p>
          <input
            type='number'
            step='0.25'
            className={cn(
              'container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none',
              { 'border-red-600': !!error, 'focus:border-blue-500': !error }
            )}
            placeholder='$0.00'
            name='amount'
          />
        </div>
        {!!error && <p className='text-red-600'>{error}</p>}

        <div className='flex justify-end'>
          <Link
            href='/auction'
            className='btn btn-primary text-center w-full mt-8 rounded-md py-4 button outline outline-2 outline-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-semibold'
          >
            Back
          </Link>

          <button
            className='btn btn-primary w-full mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md py-4 button ml-5 font-semibold'
            type='submit'
          >
            Bid
          </button>
        </div>
      </form>
    </div>
  )
}
