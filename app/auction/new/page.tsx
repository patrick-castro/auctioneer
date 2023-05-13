'use client'

import { FormEvent, useState } from 'react'
import './styles.css'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import createNewAuction from '@/utils/createNewAuction'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import cn from 'classnames'

interface Errors {
  name?: string
  startPrice?: string
  timeWindow?: string
}

export default function NewAuction() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const { data: session } = useSession()
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    const errorMap: Errors = {}

    try {
      setIsLoading(true)

      if (!session?.user) {
        throw new Error('No user session')
      }

      const { accessToken } = session.user

      const formData = new FormData(e.currentTarget)
      const name = formData.get('name') as string
      if (!name) {
        errorMap.name = 'Name should not be empty'
      }

      const startPrice = formData.get('startPrice') as string
      if (!startPrice) {
        errorMap.startPrice = 'Starting price should not be empty'
      }

      const daysToAdd = formData.get('day')
        ? parseInt(formData.get('day') as string)
        : 0
      const hoursToAdd = formData.get('hour')
        ? parseInt(formData.get('hour') as string)
        : 0
      const minutesToAdd = formData.get('minute')
        ? parseInt(formData.get('minute') as string)
        : 0

      if (!daysToAdd && !hoursToAdd && !minutesToAdd) {
        errorMap.timeWindow = 'Time window should not be empty'
      }

      // Cancel if there's error/s
      if (Object.values(errorMap).length > 0) {
        setErrors(errorMap)
        toast.dismiss()
        setIsLoading(false)
        return
      }

      toast.loading('Creating auction...')

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
          <p
            className={cn('text-sm font-semibold mb-2 text-gray-500', {
              'text-red-600': errors['name'],
            })}
          >
            Name
          </p>
          <input
            type='text'
            className={cn(
              'container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none',
              {
                'border-red-600': !!errors['name'],
                'focus:border-blue-500': !errors['name'],
              }
            )}
            name='name'
            placeholder='Auction Name'
          />
        </div>

        <div className='mt-5'>
          <p
            className={cn('text-sm font-semibold mb-2 text-gray-500', {
              'text-red-600': errors['startPrice'],
            })}
          >
            Starting Price
          </p>
          <input
            type='number'
            step='0.25'
            className={cn(
              'container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none',
              {
                'border-red-600': !!errors['startPrice'],
                'focus:border-blue-500': !errors['startPrice'],
              }
            )}
            placeholder='$0.00'
            name='startPrice'
          />
        </div>

        <div className='mt-5'>
          <p
            className={cn('text-sm font-semibold mb-2 text-gray-500', {
              'text-red-600': !!errors['timeWindow'],
            })}
          >
            Time Window
          </p>
          <div className='flex gap-4'>
            <div className='flex flex-col flex-1'>
              <label
                className={cn('text-sm font-semibold mb-2 text-gray-500', {
                  'text-red-600': !!errors['timeWindow'],
                })}
              >
                Days
              </label>
              <input
                type='number'
                min='0'
                max='365'
                placeholder='0'
                className={cn(
                  'container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none',
                  {
                    'border-red-600': !!errors['timeWindow'],
                    'focus:border-blue-500': !errors['timeWindow'],
                  }
                )}
                name='day'
              />
            </div>
            <div className='flex flex-col flex-1'>
              <label
                className={cn('text-sm font-semibold mb-2 text-gray-500', {
                  'text-red-600': !!errors['timeWindow'],
                })}
              >
                Hours
              </label>
              <input
                type='number'
                min='0'
                max='23'
                placeholder='0'
                className={cn(
                  'container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none',
                  {
                    'border-red-600': !!errors['timeWindow'],
                    'focus:border-blue-500': !errors['timeWindow'],
                  }
                )}
                name='hour'
              />
            </div>
            <div className='flex flex-col flex-1'>
              <label
                className={cn('text-sm font-semibold mb-2 text-gray-500', {
                  'text-red-600': !!errors['timeWindow'],
                })}
              >
                Minutes
              </label>
              <input
                type='number'
                min='0'
                max='59'
                placeholder='0'
                className={cn(
                  'container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none',
                  {
                    'border-red-600': !!errors['timeWindow'],
                    'focus:border-blue-500': !errors['timeWindow'],
                  }
                )}
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
