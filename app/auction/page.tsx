'use client'
import { IoFilter } from 'react-icons/io5'
import cn from 'classnames'
import { useState } from 'react'

import './styles.css'

type Filter = 'ALL' | 'ONGOING' | 'COMPLETED'

enum FilterOption {
  All = 'ALL',
  Ongoing = 'ONGOING',
  Completed = 'COMPLETED',
}

export default function Auction() {
  const [filter, setFilter] = useState<Filter>('ALL')

  const handleSelectFilter = (option: Filter) => {
    setFilter(option)
  }

  return (
    <main className='mx-8 sm:mx-24'>
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
    </main>
  )
}
