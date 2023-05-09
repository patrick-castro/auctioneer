import getAllAuctions from '@/utils/getAllAuctions'
import accounting from 'accounting'
import cn from 'classnames'

interface Props {
  filter: string
  userId: string
}

export default async function Auctions({ filter, userId }: Props) {
  const auctions = await getAllAuctions(filter)

  const renderRows = () => {
    return auctions.map(
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

  return (
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
        <tbody>{renderRows()}</tbody>
      </table>
    </section>
  )
}
