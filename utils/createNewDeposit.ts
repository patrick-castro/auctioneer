const appUrl = process.env.APP_URL

export default async function createNewDeposit(amount: string, token: string) {
  const res = await fetch(`${appUrl}/api/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      amount,
    }),
  })

  if (!res.ok) throw new Error('Failed to update user')

  return res.json()
}
