const appUrl = process.env.APP_URL

export default async function getAllAuctions(searchFilter: string) {
  const res = await fetch(`${appUrl}/api/auction`)

  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}
