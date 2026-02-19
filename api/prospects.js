const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DB_ID = "80f92d24-9eb7-4978-bfe5-a835191fcc99";

function extractText(prop) {
  if (!prop) return null;
  if (prop.type === "title") return prop.title?.map(t => t.plain_text).join("") || null;
  if (prop.type === "rich_text") return prop.rich_text?.map(t => t.plain_text).join("") || null;
  if (prop.type === "select") return prop.select?.name || null;
  if (prop.type === "multi_select") return prop.multi_select?.map(s => s.name) || [];
  if (prop.type === "number") return prop.number ?? null;
  if (prop.type === "email") return prop.email || null;
  if (prop.type === "phone_number") return prop.phone_number || null;
  if (prop.type === "date") return prop.date?.start || null;
  return null;
}

function mapPage(page) {
  const p = page.properties;
  return {
    url: page.url,
    id: page.id,
    Name: extractText(p["Name"]),
    Company: extractText(p["Company"]),
    Status: extractText(p["Status"]),
    PainPoint: extractText(p["Pain Point"]) || [],
    RevenueRange: extractText(p["Revenue Range"]),
    Source: extractText(p["Source"]),
    Probability: extractText(p["Probability"]),
    EstimatedValue: extractText(p["Estimated Value"]),
    Email: extractText(p["Email"]),
    Contact: extractText(p["Contact"]),
    Notes: extractText(p["Notes"]),
    NextAction: extractText(p["Next Action"]),
    NextActionDate: extractText(p["Next Action Date"]),
    LastContact: extractText(p["Last Contact"]),
  };
}

async function getAll() {
  let all = [], cursor = undefined;
  while (true) {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${NOTION_TOKEN}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!data.results) break;
    all = all.concat(data.results.map(mapPage));
    if (!data.has_more) break;
    cursor = data.next_cursor;
  }
  return all;
}

function buildProperties(form) {
  const props = {};
  if (form.Name !== undefined) props["Name"] = { title: [{ text: { content: form.Name || "" } }] };
  if (form.Company !== undefined) props["Company"] = { rich_text: [{ text: { content: form.Company || "" } }] };
  if (form.Status !== undefined) props["Status"] = { select: form.Status ? { name: form.Status } : null };
  if (form.PainPoint !== undefined) props["Pain Point"] = { multi_select: (form.PainPoint || []).map(n => ({ name: n })) };
  if (form.RevenueRange !== undefined) props["Revenue Range"] = { select: form.RevenueRange ? { name: form.RevenueRange } : null };
  if (form.Source !== undefined) props["Source"] = { select: form.Source ? { name: form.Source } : null };
  if (form.Probability !== undefined) props["Probability"] = { select: form.Probability ? { name: form.Probability } : null };
  if (form.EstimatedValue !== undefined) props["Estimated Value"] = { number: form.EstimatedValue || null };
  if (form.Email !== undefined) props["Email"] = { email: form.Email || null };
  if (form.Contact !== undefined) props["Contact"] = { phone_number: form.Contact || null };
  if (form.Notes !== undefined) props["Notes"] = { rich_text: [{ text: { content: form.Notes || "" } }] };
  if (form.NextAction !== undefined) props["Next Action"] = { rich_text: [{ text: { content: form.NextAction || "" } }] };
  if (form.NextActionDate !== undefined) props["Next Action Date"] = { date: form.NextActionDate ? { start: form.NextActionDate } : null };
  if (form.LastContact !== undefined) props["Last Contact"] = { date: form.LastContact ? { start: form.LastContact } : null };
  return props;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const prospects = await getAll();
      return res.status(200).json(prospects);
    }

    if (req.method === "POST") {
      const form = req.body;
      const response = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: { "Authorization": `Bearer ${NOTION_TOKEN}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
        body: JSON.stringify({ parent: { database_id: DB_ID }, properties: buildProperties(form) })
      });
      const page = await response.json();
      return res.status(200).json(mapPage(page));
    }

    if (req.method === "PATCH") {
      const { id, ...form } = req.body;
      const response = await fetch(`https://api.notion.com/v1/pages/${id}`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${NOTION_TOKEN}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
        body: JSON.stringify({ properties: buildProperties(form) })
      });
      const page = await response.json();
      return res.status(200).json(mapPage(page));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
