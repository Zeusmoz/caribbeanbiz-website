// api/notion.js — Server-side proxy for Notion API (avoids CORS)
// Called by the frontend as POST /api/notion
// Body: { endpoint: string, filter?: object }

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token = process.env.NOTION_TOKEN
  if (!token) return res.status(500).json({ error: 'Notion token not configured' })

  const { endpoint, filter } = req.body
  if (!endpoint) return res.status(400).json({ error: 'Missing endpoint' })

  try {
    const notionRes = await fetch(`https://api.notion.com/v1${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter || {}),
    })

    const data = await notionRes.json()
    return res.status(notionRes.status).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Notion request failed', detail: err.message })
  }
}
