'use client'

import { FormEvent, useState } from 'react'
import './styles.css'
import createNewDeposit from '@/utils/createNewDeposit'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import cn from 'classnames'
import { ToastContainer, toast } from 'react-toastify'

export default function NewDeposit() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>()
  const { data: session, update } = useSession()
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!session?.user) return
    const { accessToken, balance } = session.user

    if (!accessToken) return

    const formData = new FormData(e.currentTarget)
    const amount = (formData.get('amount') || '0') as string
    const parsedAmount = parseFloat(amount)

    // Validation
    if (!parsedAmount) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setIsLoading(() => true)
      toast.loading('Making a deposit...')

      const totalAmount = parseFloat(balance) + parsedAmount

      await createNewDeposit(amount, accessToken)
      await update({ updatedBalance: totalAmount })

      toast.dismiss()
      toast.success('Successfully made deposit')

      // Set a timer
      setTimeout(function () {
        router.push('/auction')
        setIsLoading(() => false)
      }, 3500) // 3.3 seconds
    } catch (error) {
      toast.dismiss()
      toast.error('Failed in making a deposit')
      setIsLoading(() => false)
    }
  }

  return (
    <div className='login-form'>
      <div className='pb-4'>
        <h1 className='text-2xl font-semibold'>Make New Deposit </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className='mt-5'>
          <p
            className={cn('text-sm font-semibold mb-2 text-gray-500', {
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
