'use client'

import { FormEvent, useState } from 'react'
import './styles.css'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import createNewAuction from '@/utils/createNewAuction'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import cn from 'classnames'

export default function NewAuction() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      toast.loading('Creating auction...')

      if (!session?.user) {
        throw new Error('No user session')
      }

      const { accessToken } = session.user

      const formData = new FormData(e.currentTarget)
      const name = formData.get('name') as string
      const startPrice = formData.get('startPrice') as string

      const daysToAdd = formData.get('day')
        ? parseInt(formData.get('day') as string)
        : 0
      const hoursToAdd = formData.get('hour')
        ? parseInt(formData.get('hour') as string)
        : 0
      const minutesToAdd = formData.get('minute')
        ? parseInt(formData.get('minute') as string)
        : 0

      const timeWindow = dayjs()
        .add(daysToAdd, 'day')
        .add(hoursToAdd, 'hour')
        .add(minutesToAdd, 'minute')
        .format()

      await createNewAuction({ name, startPrice, timeWindow }, accessToken)
      toast.dismiss()
      toast.success('Successfully created auction')

      // Set a timer
      setTimeout(function () {
        router.push('/auction')
        setIsLoading(false)
      }, 3500) // 3.3 seconds
    } catch (error) {
      toast.dismiss()
      toast.error('Failed in creating auction')
    }
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
          <button
            type='button'
            className={cn(
              'btn btn-primary text-center w-full mt-8 rounded-md py-4 button outline outline-2 outline-blue-500 text-blue-500 font-semibold',
              {
                'opacity-75': isLoading,
                'hover:text-white hover:bg-blue-500': !isLoading,
              }
            )}
            onClick={() => router.back()}
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
            Create
          </button>
        </div>
      </form>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}
