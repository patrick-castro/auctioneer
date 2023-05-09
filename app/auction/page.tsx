'use client'
import { IoFilter } from 'react-icons/io5'
import cn from 'classnames'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Auctions from './components/Auctions'

import './styles.css'
import { useSession } from 'next-auth/react'

type Filter = 'all' | 'ongoing' | 'completed'

enum FilterOption {
  All = 'all',
  Ongoing = 'ongoing',
  Completed = 'completed',
}

const ALLOWED_FILTERS = ['all', 'ongoing', 'completed']

export default function Auction() {
  const [filter, setFilter] = useState<Filter>(FilterOption.All)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  useEffect(() => {
    const searchFilter = searchParams.get('filter')
    if (!searchFilter || !ALLOWED_FILTERS.includes(searchFilter)) {
      router.replace('auction?filter=all')
    } else {
      setFilter(searchFilter as Filter)
    }
  }, [])

  const handleSelectFilter = (option: Filter) => {
    setFilter(option)
    router.replace(`auction?filter=${option}`)
  }

  return (
    <main className='mx-8 sm:mx-60 mt-2'>
      {/* Create a dedicated component for filter */}
      <div className='flex items-baseline gap-2'>
        <span className='flex items-center gap-2'>
          <IoFilter />
          <h2>Filters:</h2>
        </span>
        <div className='flex gap-5 mt-2'>
          <button
            className={cn('btn-filters', {
              'selected-btn': filter === FilterOption.All,
            })}
            onClick={() => handleSelectFilter(FilterOption.All)}
          >
            All
          </button>
          <button
            className={cn('btn-filters', {
              'selected-btn': filter === FilterOption.Ongoing,
            })}
            onClick={() => handleSelectFilter(FilterOption.Ongoing)}
          >
            Ongoing
          </button>
          <button
            className={cn('btn-filters', {
              'selected-btn': filter === FilterOption.Completed,
            })}
            onClick={() => handleSelectFilter(FilterOption.Completed)}
          >
            Completed
          </button>
        </div>
      </div>

      {/* @ts-expect-error Async Server Component */}
      <Auctions filter={filter} userId={session?.user?.id} />
    </main>
  )
}
