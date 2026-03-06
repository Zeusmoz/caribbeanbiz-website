const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8226073289'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const data = req.body

    // Validate required fields
    if (!data.email || !data.nombre) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Send Telegram notification
    const msg = `🔔 *Nuevo Lead — CaribbeanBiz AI*\n\n` +
      `👤 *Nombre:* ${data.nombre || 'N/A'}\n` +
      `📧 *Email:* ${data.email || 'N/A'}\n` +
      `📱 *Teléfono:* ${data.telefono || 'N/A'}\n` +
      `🏢 *Negocio:* ${data.negocio || 'N/A'}\n` +
      `🏭 *Industria:* ${data.industria || 'N/A'}\n` +
      `💬 *Mensajes/día:* ${data.mensajes_dia || 'N/A'}\n` +
      `🔥 *Dolor:* ${data.dolor_principal || 'N/A'}\n` +
      `\n📍 *Source:* ${data.source || 'caribbeanbiz.com/planes'}`

    if (TELEGRAM_BOT_TOKEN) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: 'Markdown',
        }),
      })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' })
  }
}
