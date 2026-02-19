import { useState, useEffect } from "react";

const STAGES = ["Cold","Contacted","Meeting Scheduled","Diagnostic Proposed","Proposal Sent","Negotiating","Closed-Won","Closed-Lost"];
const STAGE_COLORS = {
  "Cold":                "#94a3b8",
  "Contacted":           "#3b82f6",
  "Meeting Scheduled":   "#f59e0b",
  "Diagnostic Proposed": "#f97316",
  "Proposal Sent":       "#8b5cf6",
  "Negotiating":         "#ec4899",
  "Closed-Won":          "#16a34a",
  "Closed-Lost":         "#ef4444",
};
const STAGE_BG = {
  "Cold":                "#f1f5f9",
  "Contacted":           "#eff6ff",
  "Meeting Scheduled":   "#fffbeb",
  "Diagnostic Proposed": "#fff7ed",
  "Proposal Sent":       "#faf5ff",
  "Negotiating":         "#fdf2f8",
  "Closed-Won":          "#f0fdf4",
  "Closed-Lost":         "#fef2f2",
};
const PAIN_OPTIONS = ["Cash flow","Project visibility","Owner dependency","Margins","Exit prep"];
const REVENUE_OPTIONS = ["RD$10-50M","RD$50-100M","RD$100M+"];
const SOURCE_OPTIONS = ["Referral","LinkedIn","Event","Cold","Partner"];
const PROB_OPTIONS = ["10%","25%","50%","75%","90%"];

async function apiFetch(method, body) {
  const res = await fetch("/api/prospects", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  color: "#1e293b",
  padding: "8px 12px",
  fontSize: 13,
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  transition: "border-color 0.15s",
};

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#94a3b8", marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, type = "text", placeholder }) {
  return <input type={type} value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />;
}

function Select({ value, onChange, options }) {
  return (
    <select value={value ?? ""} onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", paddingRight: 30 }}>
      {options.map(o => <option key={o} value={o}>{o || "—"}</option>)}
    </select>
  );
}

function Avatar({ name }) {
  const initials = (name || "?").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const colors = ["#3b82f6","#8b5cf6","#f97316","#16a34a","#ec4899","#f59e0b"];
  const color = colors[(name || "").charCodeAt(0) % colors.length];
  return (
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: color + "20", color, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1.5px solid ${color}40` }}>
      {initials}
    </div>
  );
}

export default function Pipeline() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const isNew = selected && selected._isNew;

  function showToast(msg, type = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function fetchAll() {
    setLoading(true);
    try {
      const data = await apiFetch("GET");
      setProspects(data);
    } catch {
      showToast("Failed to connect to Notion", "err");
    }
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  function openNew(stage) { setSelected({ _isNew: true }); setForm({ Status: stage, PainPoint: [] }); }
  function openExisting(p) { setSelected(p); setForm({ ...p }); }
  function closePanel() { setSelected(null); setForm({}); }
  function upd(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function togglePain(pt) {
    const cur = form.PainPoint || [];
    upd("PainPoint", cur.includes(pt) ? cur.filter(x => x !== pt) : [...cur, pt]);
  }

  async function save() {
    setSaving(true);
    try {
      if (isNew) {
        await apiFetch("POST", form);
        showToast("Prospect created ✓");
        closePanel();
        await fetchAll();
      } else {
        await apiFetch("PATCH", { id: selected.id, ...form });
        setProspects(prev => prev.map(p => p.id === selected.id ? { ...p, ...form } : p));
        showToast("Saved to Notion ✓");
        closePanel();
      }
    } catch {
      showToast("Save failed", "err");
    }
    setSaving(false);
  }

  const filtered = search
    ? prospects.filter(p => [p.Name, p.Company, p.Status].some(f => f?.toLowerCase().includes(search.toLowerCase())))
    : prospects;

  const stageMap = {};
  STAGES.forEach(s => { stageMap[s] = []; });
  filtered.forEach(p => {
    const s = p.Status || "Cold";
    if (stageMap[s]) stageMap[s].push(p); else stageMap["Cold"].push(p);
  });

  const closedWon = prospects.filter(p => p.Status === "Closed-Won").length;
  const totalValue = prospects.filter(p => p.Status !== "Closed-Lost").reduce((a, p) => a + (p.EstimatedValue || 0), 0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", minHeight: "100vh", color: "#1e293b", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .card { transition: all 0.15s ease; cursor: pointer; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        input:focus, select:focus, textarea:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        .save-btn:hover:not(:disabled) { background: #2563eb !important; }
        .sync-btn:hover { background: #f1f5f9 !important; }
        .pain-pill { transition: all 0.12s; cursor: pointer; user-select: none; }
        .pain-pill:hover { opacity: 0.8; }
        .col-scroll { overflow-y: auto; }
        .add-btn:hover { background: #f1f5f9 !important; border-color: #94a3b8 !important; color: #475569 !important; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 170, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/logo-01.png" alt="CaribbeanBiz" style={{ height: 150, width: "auto", objectFit: "contain", display: "block" }} />
          <div style={{ width: 1, height: 40, background: "#e2e8f0" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b", letterSpacing: "0.04em" }}>CLIENT PIPELINE</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 16, marginRight: 8 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>PIPELINE VALUE</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>${totalValue.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>CLOSED</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{closedWon}</div>
            </div>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ ...inputStyle, width: 180, fontSize: 12 }} />
          <button className="sync-btn" onClick={fetchAll} disabled={loading} style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
            <span style={{ display: "inline-block", animation: loading ? "spin 1s linear infinite" : "none" }}>↻</span>
            {loading ? "Syncing" : "Sync"}
          </button>
        </div>
      </div>

      {/* Board */}
      <div style={{ flex: 1, overflowX: "auto", overflowY: "hidden", padding: "20px 20px 0", display: "flex", gap: 12 }}>
        {STAGES.map(stage => {
          const color = STAGE_COLORS[stage];
          const bg = STAGE_BG[stage];
          const cards = stageMap[stage] || [];
          return (
            <div key={stage} style={{ minWidth: 220, maxWidth: 220, flexShrink: 0, display: "flex", flexDirection: "column", height: "calc(100vh - 210px)" }}>
              <div style={{ background: bg, border: `1px solid ${color}25`, borderRadius: "10px 10px 0 0", padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: color, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{stage}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: color, padding: "1px 8px", borderRadius: 10, flexShrink: 0 }}>{cards.length}</span>
              </div>
              <div className="col-scroll" style={{ flex: 1, background: "#fff", border: `1px solid #e2e8f0`, borderTop: "none", borderRadius: "0 0 10px 10px", display: "flex", flexDirection: "column", gap: 0, paddingBottom: 8, overflow: "auto" }}>
                {cards.map(p => (
                  <div key={p.id} className="card" onClick={() => openExisting(p)}
                    style={{ margin: "8px 8px 0", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "11px 12px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 8 }}>
                      <Avatar name={p.Name} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.Name || "—"}</div>
                        {p.Company && <div style={{ fontSize: 11, color: "#64748b", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.Company}</div>}
                      </div>
                    </div>
                    {(p.PainPoint?.length > 0) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
                        {p.PainPoint.slice(0, 2).map(pt => (
                          <span key={pt} style={{ fontSize: 9, padding: "2px 7px", background: "#f1f5f9", color: "#64748b", borderRadius: 4, fontWeight: 500 }}>{pt}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {p.RevenueRange && <span style={{ fontSize: 10, color: "#94a3b8" }}>{p.RevenueRange}</span>}
                      {p.Probability && <span style={{ fontSize: 10, fontWeight: 600, color, marginLeft: "auto" }}>{p.Probability}</span>}
                    </div>
                    {p.NextAction && (
                      <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #f1f5f9", fontSize: 10, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        → {p.NextAction}
                      </div>
                    )}
                  </div>
                ))}
                <button className="add-btn" onClick={() => openNew(stage)}
                  style={{ margin: "8px 8px 0", background: "none", border: "1.5px dashed #e2e8f0", color: "#cbd5e1", padding: "8px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 500, transition: "all 0.15s", flexShrink: 0 }}>
                  + Add prospect
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Panel */}
      {selected !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
          <div onClick={closePanel} style={{ flex: 1, background: "rgba(15,23,42,0.3)", backdropFilter: "blur(4px)" }} />
          <div style={{ width: 440, background: "#fff", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "-8px 0 32px rgba(0,0,0,0.08)" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              {!isNew && <Avatar name={form.Name} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {isNew ? "New Prospect" : (form.Name || "Edit Prospect")}
                </div>
                {!isNew && form.Company && <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{form.Company}</div>}
              </div>
              {!isNew && form.Status && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: STAGE_BG[form.Status] || "#f1f5f9", color: STAGE_COLORS[form.Status] || "#64748b", border: `1px solid ${STAGE_COLORS[form.Status]}30`, whiteSpace: "nowrap" }}>
                  {form.Status}
                </span>
              )}
              <button onClick={closePanel} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 20, cursor: "pointer", lineHeight: 1, padding: 4, borderRadius: 4, flexShrink: 0 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="Stage">
                <Select value={form.Status} onChange={v => upd("Status", v)} options={STAGES} />
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Contact Name">
                  <TextInput value={form.Name} onChange={v => upd("Name", v)} placeholder="Full name" />
                </Field>
                <Field label="Company">
                  <TextInput value={form.Company} onChange={v => upd("Company", v)} placeholder="Company name" />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Revenue Range">
                  <Select value={form.RevenueRange} onChange={v => upd("RevenueRange", v)} options={["", ...REVENUE_OPTIONS]} />
                </Field>
                <Field label="Probability">
                  <Select value={form.Probability} onChange={v => upd("Probability", v)} options={["", ...PROB_OPTIONS]} />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Source">
                  <Select value={form.Source} onChange={v => upd("Source", v)} options={["", ...SOURCE_OPTIONS]} />
                </Field>
                <Field label="Est. Value (USD)">
                  <TextInput value={form.EstimatedValue} onChange={v => upd("EstimatedValue", v ? parseFloat(v) : null)} type="number" placeholder="0" />
                </Field>
              </div>
              <Field label="Pain Points">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
                  {PAIN_OPTIONS.map(pt => {
                    const on = (form.PainPoint || []).includes(pt);
                    return (
                      <span key={pt} className="pain-pill" onClick={() => togglePain(pt)}
                        style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${on ? "#3b82f6" : "#e2e8f0"}`, background: on ? "#eff6ff" : "#fff", color: on ? "#3b82f6" : "#94a3b8", fontWeight: on ? 600 : 400 }}>
                        {pt}
                      </span>
                    );
                  })}
                </div>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Email">
                  <TextInput value={form.Email} onChange={v => upd("Email", v)} placeholder="email@example.com" />
                </Field>
                <Field label="Phone">
                  <TextInput value={form.Contact} onChange={v => upd("Contact", v)} placeholder="+1 809..." />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Last Contact">
                  <TextInput value={form.LastContact} onChange={v => upd("LastContact", v)} type="date" />
                </Field>
                <Field label="Next Action Date">
                  <TextInput value={form.NextActionDate} onChange={v => upd("NextActionDate", v)} type="date" />
                </Field>
              </div>
              <Field label="Next Action">
                <TextInput value={form.NextAction} onChange={v => upd("NextAction", v)} placeholder="e.g. Send proposal" />
              </Field>
              <Field label="Notes">
                <textarea value={form.Notes ?? ""} onChange={e => upd("Notes", e.target.value)} rows={4} placeholder="Discovery notes, pain details..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }} />
              </Field>
            </div>
            <div style={{ padding: "14px 22px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 10, flexShrink: 0, background: "#fafafa" }}>
              <button className="save-btn" onClick={save} disabled={saving}
                style={{ flex: 1, background: saving ? "#94a3b8" : "#3b82f6", color: "#fff", border: "none", padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s" }}>
                {saving ? "Saving..." : (isNew ? "Create in Notion" : "Save to Notion")}
              </button>
              <button onClick={closePanel}
                style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#64748b", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "err" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${toast.type === "err" ? "#fca5a5" : "#86efac"}`, color: toast.type === "err" ? "#dc2626" : "#16a34a", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500, zIndex: 200, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", whiteSpace: "nowrap" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
