'use client'

import { FormEvent } from 'react'
import './styles.css'
import createNewDeposit from '@/utils/createNewDeposit'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewDeposit() {
  const { data: session, update } = useSession()
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session?.user) return
    const { accessToken, balance } = session.user

    const formData = new FormData(e.currentTarget)
    const amount = (formData.get('amount') || '0') as string

    if (!accessToken) return

    const totalAmount = parseFloat(balance) + parseFloat(amount)

    await createNewDeposit(amount, accessToken)
    await update({ updatedBalance: totalAmount })
    router.push('/auction')
  }

  return (
    <div className='login-form'>
      <div className='pb-4'>
        <h1 className='text-2xl font-semibold'>Make New Deposit </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>Amount</p>
          <input
            type='number'
            step='0.25'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
            placeholder='$0.00'
            name='amount'
          />
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
