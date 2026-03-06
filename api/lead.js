const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8226073289'
const NOTION_KEY = process.env.NOTION_KEY
const NOTION_DB_ID = '80f92d24-9eb7-4978-bfe5-a835191fcc99'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const data = req.body

    if (!data.email || !data.nombre) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Map industria to Pain Point tags
    const painPoints = []
    if (data.dolor_principal) painPoints.push({ name: 'Response Time' })
    if (data.mensajes_dia === 'mas-80') painPoints.push({ name: 'High Volume' })

    // 1. Create lead in Notion Prospects DB
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: {
          'Name': { title: [{ text: { content: data.nombre } }] },
          'Email': { email: data.email },
          'Contact': { phone_number: data.telefono || '' },
          'Company': { rich_text: [{ text: { content: data.negocio || '' } }] },
          'Status': { select: { name: 'New' } },
          'Source': { select: { name: 'Landing Page' } },
          'Notes': { rich_text: [{ text: { content: `Industria: ${data.industria || 'N/A'}\nMensajes/día: ${data.mensajes_dia || 'N/A'}\nDolor: ${data.dolor_principal || 'N/A'}` } }] },
        },
      }),
    })

    const notionOk = notionRes.ok

    // 2. Send Telegram notification
    let telegramOk = false
    if (TELEGRAM_BOT_TOKEN) {
      const msg = `🔔 *Nuevo Lead — CaribbeanBiz AI*\n\n` +
        `👤 *Nombre:* ${data.nombre || 'N/A'}\n` +
        `📧 *Email:* ${data.email || 'N/A'}\n` +
        `📱 *Teléfono:* ${data.telefono || 'N/A'}\n` +
        `🏢 *Negocio:* ${data.negocio || 'N/A'}\n` +
        `🏭 *Industria:* ${data.industria || 'N/A'}\n` +
        `💬 *Mensajes/día:* ${data.mensajes_dia || 'N/A'}\n` +
        `🔥 *Dolor:* ${data.dolor_principal || 'N/A'}\n` +
        `\n✅ *Notion:* ${notionOk ? 'Guardado' : 'Error'}`

      const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: 'Markdown',
        }),
      })
      telegramOk = tgRes.ok
    }

    return res.status(200).json({ ok: true, notion: notionOk, telegram: telegramOk })
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' })
  }
}
