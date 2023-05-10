export default async function createNewDeposit(amount: string, token: string) {
  const res = await fetch('http://localhost:3000/api/user', {
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
