'use client'

import Link from 'next/link'
import { Dropdown } from '../Dropdown'

export default function Navbar() {
  return (
    <nav className='h-20 px-8 sm:px-24 flex items-center fixed w-full justify-between'>
      <Link href='/'>
        <h1 className='text-2xl font-semibold'>Auction</h1>
      </Link>
      <Dropdown />
    </nav>
  )
}
