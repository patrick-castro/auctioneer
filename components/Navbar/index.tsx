'use client'

import Link from 'next/link'
import { Dropdown } from '../Dropdown'
import { FcDonate } from 'react-icons/fc'
import accounting from 'accounting'

export default function Navbar() {
  const balance = accounting.formatMoney(5)

  return (
    <nav className='h-20 px-8 sm:px-24 flex items-center fixed w-full justify-between z-10'>
      <Link href='/' className='flex items-center gap-2'>
        <FcDonate className='text-3xl' />
        <h1 className='text-2xl font-semibold'>Auctioneer</h1>
      </Link>
      {/* TODO: Remove Dropdown if user is not yet logged in */}

      <span className='mr-4 font-semibold'>Balance: {balance}</span>
      <Dropdown />
    </nav>
  )
}
