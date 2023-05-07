'use client'

import Link from 'next/link'
import { Dropdown } from '../Dropdown'
import { FcDonate } from 'react-icons/fc'

export default function Navbar() {
  return (
    <nav className='h-20 px-8 sm:px-24 flex items-center fixed w-full justify-between z-10'>
      <Link href='/' className='flex items-center gap-2'>
        <FcDonate className='text-3xl' />
        <h1 className='text-2xl font-semibold'>Auctioneer</h1>
      </Link>
      <Dropdown />
    </nav>
  )
}
