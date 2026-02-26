// Notion client — routes through /api/notion proxy (avoids CORS)

const CLIENTES_DB      = import.meta.env.VITE_NOTION_CLIENTES_DB
const AGENTES_DB       = import.meta.env.VITE_NOTION_AGENTES_DB
const SUSCRIPCIONES_DB = import.meta.env.VITE_NOTION_SUSCRIPCIONES_DB
const TOKENS_DB        = import.meta.env.VITE_NOTION_TOKENS_DB

async function queryDatabase(databaseId, filter = {}) {
  const res = await fetch('/api/notion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: `/databases/${databaseId}/query`,
      filter,
    }),
  })
  if (!res.ok) throw new Error(`Notion proxy error: ${res.status}`)
  return res.json()
}

export async function getClientByEmail(email) {
  const data = await queryDatabase(CLIENTES_DB, {
    filter: {
      property: 'Contacto',
      rich_text: { contains: email }
    }
  })
  return data.results?.[0] || null
}

export async function getAgentesByCliente(clienteNombre) {
  const data = await queryDatabase(AGENTES_DB, {
    filter: {
      property: 'Cliente asignado',
      relation: { contains: clienteNombre }
    }
  })
  return data.results || []
}

export async function getSuscripcionesByCliente(clienteNombre) {
  const data = await queryDatabase(SUSCRIPCIONES_DB, {
    filter: {
      property: 'Cliente',
      relation: { contains: clienteNombre }
    }
  })
  return data.results || []
}

export async function getTokensByCliente(clienteNombre) {
  const data = await queryDatabase(TOKENS_DB, {
    filter: {
      property: 'Cliente',
      relation: { contains: clienteNombre }
    }
  })
  return data.results || []
}

// ── Property helpers ──────────────────────────────────────────

export function getText(prop) {
  return prop?.rich_text?.map(t => t.plain_text).join('') ||
         prop?.title?.map(t => t.plain_text).join('') || '—'
}

export function getSelect(prop) {
  return prop?.select?.name || '—'
}

export function getNumber(prop) {
  return prop?.number ?? 0
}

export function getDate(prop) {
  return prop?.date?.start || null
}

export function getCheckbox(prop) {
  return prop?.checkbox || false
}

export function getRelation(prop) {
  return prop?.relation?.map(r => r.id) || []
}
