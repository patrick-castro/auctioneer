interface Body {
  name: string
  startPrice: string
  timeWindow: string
}

export default async function createNewAuction(body: Body, token: string) {
  const res = await fetch('http://localhost:3000/api/auction', {
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
