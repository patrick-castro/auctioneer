export default async function getAllAuctions(searchFilter: string) {
  const res = await fetch('http://localhost:3000/api/auction')

  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}
