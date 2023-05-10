import { FC, ReactNode, RefObject, useRef, useState } from 'react'
import { RiAccountCircleLine, RiAuctionLine } from 'react-icons/ri'
import { GoChevronDown, GoX } from 'react-icons/go'
import { MdLocalAtm } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import './styles.css'

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
  const router = useRouter()

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

  const onCreateAuction = () => {
    router.push('/auction/new')
    setIsOpen(false)
  }

  const onDeposit = () => {
    router.push('/deposit/new')
    setIsOpen(false)
  }

  const onLogOut = () => {
    signOut()
    setIsOpen(false)
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
        <button onClick={onCreateAuction} className='redirect-btn'>
          <RiAuctionLine />
          <span>Create Auction</span>
        </button>
        <button onClick={onDeposit} className='redirect-btn'>
          <MdLocalAtm />
          <span>Deposit</span>
        </button>
        <button onClick={onLogOut}>
          <TbLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
