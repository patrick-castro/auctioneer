'use client'

import { FormEvent } from 'react'
import './styles.css'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import createNewAuction from '@/utils/createNewAuction'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewAuction() {
  const { data: session } = useSession()
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session?.user) return

    const { accessToken } = session.user

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const startPrice = formData.get('startPrice') as string

    const daysToAdd = parseInt(formData.get('day') as string)
    const hoursToAdd = parseInt(formData.get('hour') as string)
    const minutesToAdd = parseInt(formData.get('minute') as string)

    const timeWindow = dayjs()
      .add(daysToAdd, 'day')
      .add(hoursToAdd, 'hour')
      .add(minutesToAdd, 'minute')
      .format()

    await createNewAuction({ name, startPrice, timeWindow }, accessToken)
    router.push('/auction')
  }

  return (
    <div className='login-form'>
      <div className='pb-4'>
        <h1 className='text-2xl font-semibold'>Create Auction Item</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>Name</p>
          <input
            type='text'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
            name='name'
            placeholder='Auction Name'
          />
        </div>

        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Start Price
          </p>
          <input
            type='number'
            step='0.25'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
            placeholder='$0.00'
            name='startPrice'
          />
        </div>

        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Time Window
          </p>
          <div className='flex gap-4'>
            <div className='flex flex-col flex-1'>
              <label className='text-sm font-semibold mb-2 text-gray-500'>
                Days
              </label>
              <input
                type='number'
                min='0'
                max='365'
                placeholder='0'
                className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
                name='day'
              />
            </div>
            <div className='flex flex-col flex-1'>
              <label className='text-sm font-semibold mb-2 text-gray-500'>
                Hours
              </label>
              <input
                type='number'
                min='0'
                max='23'
                placeholder='0'
                className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
                name='hour'
              />
            </div>
            <div className='flex flex-col flex-1'>
              <label className='text-sm font-semibold mb-2 text-gray-500'>
                Minutes
              </label>
              <input
                type='number'
                min='0'
                max='59'
                placeholder='0'
                className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
                name='minute'
              />
            </div>
          </div>
        </div>

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
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
