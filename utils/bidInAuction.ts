export default async function bidInAuction(
  auctionId: string,
  amount: string,
  token: string
) {
  const res = await fetch(`http://localhost:3000/api/bid/${auctionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ price: amount }),
  })

  if (!res.ok) throw new Error('Failed to create bid')

  return res.json()
}
