'use client'

import { FormEvent, useState } from 'react'
import './styles.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import bidInAuction from '@/utils/bidInAuction'
import cn from 'classnames'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import formatTimeDiff from '@/utils/formatTimeDiff'
import accounting from 'accounting'

const appUrl = process.env.NEXT_PUBLIC_APP_URL

interface Params {
  params: {
    id: string
  }
}

export default function NewBid({ params: { id } }: Params) {
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const {
    data: auctionData,
    error: auctionError,
    isLoading,
  } = useSWR(`${appUrl}/api/auction/${id}`, fetcher)

  const { name, startPrice, timeWindow } = auctionData || {}
  const duration = formatTimeDiff(timeWindow)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLoading) return

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

    if (parseFloat(amount) > parseFloat(balance)) {
      setError('Insufficient balance to bid')
      return
    }

    if (parseFloat(amount) < parseFloat(startPrice)) {
      setError('Bid amount must be higher than the current price')
      return
    }

    await bidInAuction(id, amount, accessToken)
    router.push('/auction')
  }

  return (
    <div className='login-form'>
      <div className='pb-6'>
        <h1 className='text-2xl font-semibold'>Bid for this Item</h1>
      </div>

      <div className='flex flex-col gap-4'>
        <span className='flex items-center'>
          <label className='font-semibold w-1/3 text-gray-700'>Name:</label>

          {isLoading ? (
            <div className='w-6/12 h-5 bg-gray-200 rounded animate-pulse'></div>
          ) : (
            <p className='w-2/3'>{name}</p>
          )}
        </span>
        <span className='flex items-center'>
          <label className='font-semibold w-1/3 text-gray-700'>
            Current Price:
          </label>
          {isLoading ? (
            <div className='w-3/12 h-5 bg-gray-200 rounded animate-pulse'></div>
          ) : (
            <p className='w-2/3'>{accounting.formatMoney(startPrice)}</p>
          )}
        </span>
        <span className='flex items-center'>
          <label className='font-semibold w-1/3 text-gray-700'>Duration:</label>
          {isLoading ? (
            <div className='w-4/12 h-5 bg-gray-200 rounded animate-pulse'></div>
          ) : (
            <p className='w-2/3'>{duration}</p>
          )}
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
          <button
            type='button'
            onClick={() => router.back()}
            className={cn(
              'btn btn-primary text-center w-full mt-8 rounded-md py-4 button outline outline-2 outline-blue-500 text-blue-500 font-semibold',
              {
                'opacity-75': isLoading,
                'hover:text-white hover:bg-blue-500': !isLoading,
              }
            )}
            disabled={isLoading}
          >
            Back
          </button>

          <button
            className={cn(
              'btn btn-primary w-full mt-8 text-white bg-blue-500 rounded-md py-4 button ml-5 font-semibold',
              { 'opacity-75': isLoading, 'hover:bg-blue-600': !isLoading }
            )}
            type='submit'
            disabled={isLoading}
          >
            Bid
          </button>
        </div>
      </form>
    </div>
  )
}
