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

function EmptyState() {
  return (
    <div className='flex justify-center bg-gray-100 py-4'>
      No results found!
    </div>
  )
}

export default function Auctions({ auctions, isLoading }: Props) {
  const { data: session } = useSession()
  const [memoizedAuctions, setMemoizedAuctions] = useState<Auction[]>([])
  const [isProcessingData, setIsProcessingData] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!auctions) return

    if (!auctions.length) {
      return setMemoizedAuctions([])
    }

    setIsProcessingData(() => true)
    const timer = setInterval(() => {
      const mappedAuctions = auctions.map((auction: Auction) => ({
        ...auction,
        timeWindow: formatTimeDiff(auction.timeWindow),
      }))

      setMemoizedAuctions(mappedAuctions)
      setIsProcessingData(() => false)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [auctions])

  const userId = session?.user.id

  const renderRows = () => {
    if (isLoading || isProcessingData) {
      // Fill random item to make map work
      const blankArr = new Array(6).fill('a')
      return blankArr.map((item: string, idx: number) => {
        return (
          <tr className={cn({ 'bg-gray-100': idx % 2 === 0 })} key={idx}>
            <td className='border px-4 py-2'>
              <div className='w-2/3 h-5 bg-gray-200 rounded animate-pulse my-2'></div>
            </td>
            <td className='border px-4 py-2'>
              <div className='w-full h-5 bg-gray-200 rounded animate-pulse my-2'></div>
            </td>
            <td className='border px-4 py-2'>
              <div className='w-full h-5 bg-gray-200 rounded animate-pulse my-2'></div>
            </td>
            <td className='border px-4 py-2 text-center align-middle '>
              <div className='w-full h-5 bg-gray-200 rounded animate-pulse my-2'></div>
            </td>
          </tr>
        )
      })
    }

    if (!memoizedAuctions.length) return

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

      {!auctions?.length && !isLoading && !isProcessingData && <EmptyState />}
    </section>
  )
}
