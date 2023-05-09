import { FC, ReactNode, RefObject, useRef, useState } from 'react'
import { RiAccountCircleLine, RiAuctionLine } from 'react-icons/ri'
import { GoChevronDown, GoX } from 'react-icons/go'
import { MdLocalAtm } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import { useSession, signOut } from 'next-auth/react'

import './styles.css'
import Link from 'next/link'

type IconProps = {
  children: ReactNode
  className?: string
  iconRef?: RefObject<HTMLSpanElement>
}

const Icon: FC<IconProps> = ({ children, iconRef, className }) => (
  <span
    ref={iconRef}
    className={`${className || ''} material-symbols-outlined`}
  >
    {children}
  </span>
)

export const Dropdown = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const chevronRef = useRef<HTMLSpanElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [menuTop, setMenuTop] = useState<string>()
  const [menuRight, setMenuRight] = useState<string>()

  const { data: session } = useSession()
  const { user } = session || {}

  const handleClick = () => {
    const buttonRect = buttonRef?.current?.getBoundingClientRect()
    const chevronRect = chevronRef?.current?.getBoundingClientRect()

    if (buttonRect && chevronRect && isOpen) {
      const menuRight = buttonRect.right - chevronRect.right
      const menuTop = chevronRect.top - buttonRect.top
      setMenuRight(`${menuRight}px`)
      setMenuTop(`${menuTop}px`)
    } else {
      setMenuRight('0')
      setMenuTop('78px')
    }

    setIsOpen(!isOpen)
  }

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      {!!user && (
        <button ref={buttonRef} onClick={handleClick} className='justify-end'>
          <RiAccountCircleLine className='text-xl' />
          <span>{user.email}</span>
          <span className='chevron'>
            {isOpen ? <GoX /> : <GoChevronDown />}
          </span>
        </button>
      )}

      <div
        className={`menu ${isOpen ? 'open' : ''}`}
        style={{ right: menuRight, top: menuTop }}
      >
        <Link href='/auction/new' className='redirect-btn'>
          <RiAuctionLine />
          <span>Create Auction</span>
        </Link>
        <Link href='/deposit/new' className='redirect-btn'>
          <MdLocalAtm />
          <span>Deposit</span>
        </Link>
        <button onClick={() => signOut()}>
          <TbLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
