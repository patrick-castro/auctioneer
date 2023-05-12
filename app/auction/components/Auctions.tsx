import accounting from 'accounting'
import cn from 'classnames'
import { useSession } from 'next-auth/react'
import formatTimeDiff from '@/utils/formatTimeDiff'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  auctions: Auction[]
  isLoading: boolean
}

export default function Auctions({ auctions, isLoading }: Props) {
  const { data: session } = useSession()
  const [memoizedAuctions, setMemoizedAuctions] = useState<Auction[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!auctions || !auctions.length) return

    const timer = setInterval(() => {
      const mappedAuctions = auctions.map((auction: Auction) => ({
        ...auction,
        timeWindow: formatTimeDiff(auction.timeWindow),
      }))
      setMemoizedAuctions(mappedAuctions)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [auctions])

  const userId = session?.user.id

  const renderRows = () => {
    return memoizedAuctions.map(
      ({ id, name, startPrice, timeWindow, ownerId }: Auction, idx: number) => {
        return (
          <tr className={cn({ 'bg-gray-100': idx % 2 === 0 })} key={id}>
            <td className='border px-4 py-2'>{name}</td>
            <td className='border px-4 py-2 text-center'>
              {accounting.formatMoney(startPrice)}
            </td>
            <td className='border px-4 py-2 text-center'>{timeWindow}</td>
            <td className='border px-4 py-2 text-center'>
              <button
                className={cn(
                  `text-white font-bold py-2 px-6 rounded ${
                    ownerId === userId || timeWindow === '0'
                      ? 'bg-blue-200'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`
                )}
                onClick={() => router.push(`/auction/${id}/bid`)}
                disabled={ownerId === userId || timeWindow === '0'}
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
    <section className='mt-8 mb-24'>
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
