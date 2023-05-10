import accounting from 'accounting'
import cn from 'classnames'
import { useSession } from 'next-auth/react'
import formatTimeDiff from '@/utils/formatTimeDiff'

interface Props {
  data: Auction[]
  isLoading: boolean
}

export default function Auctions({ data, isLoading }: Props) {
  const { data: session } = useSession()

  const userId = session?.user.id

  const renderRows = () => {
    return data.map(
      ({ id, name, startPrice, timeWindow, ownerId }: Auction, idx: number) => {
        return (
          <tr className={cn({ 'bg-gray-100': idx % 2 === 0 })} key={id}>
            <td className='border px-4 py-2'>{name}</td>
            <td className='border px-4 py-2 text-center'>
              {accounting.formatMoney(startPrice)}
            </td>
            <td className='border px-4 py-2 text-center'>
              {formatTimeDiff(timeWindow)}
            </td>
            <td className='border px-4 py-2 text-center'>
              <button
                className={cn('text-white font-bold py-2 px-6 rounded', {
                  'bg-blue-500 hover:bg-blue-600': ownerId !== userId,
                  'bg-blue-200': ownerId === userId,
                })}
                disabled={ownerId === userId}
              >
                Bid
              </button>
            </td>
          </tr>
        )
      }
    )
  }

  const renderLoadingState = () => {
    return (
      <tr className='animate-pulse'>
        <td className='w-2/5 px-4 py-2 bg-gray-100'></td>
        <td className='w-1/5 px-4 py-2 bg-gray-100'></td>
        <td className='w-1/5 px-4 py-2 bg-gray-100'></td>
        <td className='w-1/5 px-4 py-2 bg-gray-100'></td>
      </tr>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <section className='mt-8'>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='w-5/12 px-4 py-2'>Name</th>
            <th className='w-2/12 px-4 py-2'>Current Price</th>
            <th className='w-3/12 px-4 py-2'>Duration</th>
            <th className='w-2/12 px-4 py-2'>Bid</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </section>
  )
}
