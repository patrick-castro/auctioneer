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
  const [filter, setFilter] = useState<Filter>(FilterOption.All)

  const handleSelectFilter = (option: Filter) => {
    setFilter(option)
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

      <section className='mt-8'>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='w-2/5 px-4 py-2'>Name</th>
              <th className='w-1/5 px-4 py-2'>Current Price</th>
              <th className='w-1/5 px-4 py-2'>Duration</th>
              <th className='w-1/5 px-4 py-2'>Bid</th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-gray-100'>
              <td className='border px-4 py-2'>Item 1</td>
              <td className='border px-4 py-2 text-center'>$10.00</td>
              <td className='border px-4 py-2 text-center'>2 days</td>
              <td className='border px-4 py-2 text-center'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded'>
                  Bid
                </button>
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Item 2</td>
              <td className='border px-4 py-2 text-center'>$15.00</td>
              <td className='border px-4 py-2 text-center'>1 day</td>
              <td className='border px-4 py-2 text-center'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded'>
                  Bid
                </button>
              </td>
            </tr>
            <tr className='bg-gray-100'>
              <td className='border px-4 py-2'>Item 3</td>
              <td className='border px-4 py-2 text-center'>$20.00</td>
              <td className='border px-4 py-2 text-center'>3 days</td>
              <td className='border px-4 py-2 text-center'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded'>
                  Bid
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}
