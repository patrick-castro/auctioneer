'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { RiAuctionLine } from 'react-icons/ri'

export default function Home() {
  const { status } = useSession()

  const renderButtons = () => {
    if (status === 'loading') return

    if (status === 'unauthenticated') {
      return (
        <>
          <div className='flex gap-5 mt-4'>
            <Link
              href='/login'
              className='w-40 py-5 text-center bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold text-white shadow-lg'
            >
              Login
            </Link>
            <Link
              href='/register'
              className='w-40 py-5 text-center bg-white outline outline-2 outline-indigo-500 rounded-lg font-bold text-indigo-600 hover:text-white hover:bg-indigo-500 shadow-lg'
            >
              Register
            </Link>
          </div>
        </>
      )
    }

    return (
      <div className='flex gap-5 mt-4'>
        <Link
          href='/auction'
          className='w-72 py-5 text-center bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold text-white shadow-lg flex items-center justify-center gap-2'
        >
          Let&apos;s Start Auctioning!
          <RiAuctionLine className='text-xl' />
        </Link>
      </div>
    )
  }

  return (
    <main>
      <div className='w-full'>
        <Image
          src='/images/auction.jpeg'
          alt='Add to cart image'
          priority={true}
          fill={true}
          className='image-brightness-wrapper'
        />

        <div className='z-10 absolute top-80 left-20 gap-20'>
          <h1 className='text-5xl font-semibold pb-2 text-white text-shadow'>
            Winning is just a bid away.
          </h1>
          <p className='text-2xl pl-1 font-normal pb-2 text-white text-shadow-sm'>
            Experience the thrill of Auctioneer.
          </p>
          {renderButtons()}
        </div>
      </div>
    </main>
  )
}
