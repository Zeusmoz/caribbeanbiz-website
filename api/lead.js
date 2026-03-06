const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8226073289'
const NOTION_KEY = process.env.NOTION_KEY
const NOTION_DB_ID = '80f92d24-9eb7-4978-bfe5-a835191fcc99'
const RESEND_API_KEY = process.env.RESEND_API_KEY

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

    const firstName = data.nombre.split(' ')[0]

    // 1. Create lead in Notion Prospects DB
    let notionOk = false
    if (NOTION_KEY) {
      try {
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
        notionOk = notionRes.ok
      } catch (_) {}
    }

    // 2. Send auto-reply email to lead
    let emailOk = false
    if (RESEND_API_KEY) {
      try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 24px; font-weight: 800; color: #F5F0DC; }
    .logo span { color: #C4285A; }
    .card { background: #12121a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px 32px; margin-bottom: 24px; }
    h1 { color: #F5F0DC; font-size: 24px; margin: 0 0 16px; }
    p { color: rgba(232,228,224,0.65); font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .highlight { color: #F5F0DC; font-weight: 600; }
    .cta-btn { display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #C4285A, #D4AA6A); color: #0a0a0f; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 10px; margin: 24px 0; }
    .steps { margin: 24px 0; }
    .step { display: flex; gap: 12px; margin-bottom: 16px; }
    .step-num { background: rgba(196,40,90,0.15); color: #C4285A; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700; flex-shrink: 0; }
    .step-text { color: rgba(232,228,224,0.65); font-size: 14px; line-height: 1.6; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 24px 0; }
    .footer { text-align: center; padding: 24px; }
    .footer p { font-size: 12px; color: rgba(232,228,224,0.3); }
    .footer a { color: #C4285A; text-decoration: none; }
    .whatsapp { display: inline-block; padding: 12px 28px; background: rgba(37,211,102,0.12); border: 1px solid rgba(37,211,102,0.25); color: #25D366; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Caribbean<span>Biz</span></div>
    </div>
    
    <div class="card">
      <h1>Hola ${firstName} 👋</h1>
      <p>Soy Edwin de <span class="highlight">CaribbeanBiz</span>. Recibí tu solicitud y quiero que sepas que ya estamos revisando tu caso.</p>
      
      <p>Vi que tu negocio es <span class="highlight">${data.negocio || 'tu empresa'}</span> y entiendo el dolor — ${data.dolor_principal ? data.dolor_principal.toLowerCase() : 'necesitas automatizar para no perder clientes'}. Es exactamente lo que resolvemos.</p>

      <hr class="divider">

      <p style="color: #F5F0DC; font-weight: 600; font-size: 16px;">¿Qué sigue?</p>
      
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-text"><span class="highlight">Agenda tu consulta gratuita</span> — en 30 minutos te muestro exactamente cómo un agente de IA resolvería tu problema específico.</div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-text"><span class="highlight">Te hago una demo en vivo</span> — verás al agente respondiendo mensajes como si fuera parte de tu equipo.</div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-text"><span class="highlight">Decidimos juntos</span> — sin presión, sin compromiso. Si tiene sentido, arrancamos en 72 horas.</div>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0?gv=true" class="cta-btn">📅 Agendar mi consulta gratuita</a>
      </div>

      <hr class="divider">

      <p>¿Prefieres escribirme directo? Estoy disponible por WhatsApp:</p>
      
      <div style="text-align: center;">
        <a href="https://wa.me/17867743478?text=Hola%20Edwin%2C%20acabo%20de%20llenar%20el%20formulario%20en%20caribbeanbiz.com" class="whatsapp">💬 Escribir por WhatsApp</a>
      </div>
    </div>

    <div class="footer">
      <p>CaribbeanBiz LLC · Santo Domingo, DR<br>
      <a href="https://www.caribbeanbiz.com">caribbeanbiz.com</a></p>
      <p style="margin-top: 12px;">Este email fue enviado porque completaste el formulario en caribbeanbiz.com/planes.<br>Si no fuiste tú, puedes ignorar este mensaje.</p>
    </div>
  </div>
</body>
</html>`

        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Edwin de CaribbeanBiz <edwingrullon@caribbeanbiz.com>',
            to: [data.email],
            subject: `${firstName}, tu agente de IA está a un paso 🚀`,
            html: emailHtml,
            reply_to: 'edwingrullon@caribbeanbiz.com',
          }),
        })
        emailOk = emailRes.ok
      } catch (_) {}
    }

    // 3. Send Telegram notification
    let telegramOk = false
    if (TELEGRAM_BOT_TOKEN) {
      try {
        const msg = `🔔 *Nuevo Lead — CaribbeanBiz AI*\n\n` +
          `👤 *Nombre:* ${data.nombre || 'N/A'}\n` +
          `📧 *Email:* ${data.email || 'N/A'}\n` +
          `📱 *Teléfono:* ${data.telefono || 'N/A'}\n` +
          `🏢 *Negocio:* ${data.negocio || 'N/A'}\n` +
          `🏭 *Industria:* ${data.industria || 'N/A'}\n` +
          `💬 *Mensajes/día:* ${data.mensajes_dia || 'N/A'}\n` +
          `🔥 *Dolor:* ${data.dolor_principal || 'N/A'}\n` +
          `\n✅ *Notion:* ${notionOk ? 'Guardado' : 'Error'}\n` +
          `📧 *Email auto-reply:* ${emailOk ? 'Enviado' : 'Pendiente'}`

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
      } catch (_) {}
    }

    return res.status(200).json({ ok: true, notion: notionOk, email: emailOk, telegram: telegramOk })
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' })
  }
}
