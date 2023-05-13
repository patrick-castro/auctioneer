interface Body {
  name: string
  startPrice: string
  timeWindow: string
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL

export default async function createNewAuction(body: Body, token: string) {
  const res = await fetch(`${appUrl}/api/auction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error('Failed to create auction')

  return res.json()
}
