const appUrl = process.env.NEXT_PUBLIC_APP_URL

export default async function bidInAuction(
  auctionId: string,
  amount: string,
  token: string
) {
  const res = await fetch(`${appUrl}/api/bid/${auctionId}`, {
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
