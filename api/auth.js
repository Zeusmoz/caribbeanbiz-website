export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const usersRaw = process.env.PIPELINE_USERS;
    if (!usersRaw) return res.status(500).json({ error: 'No users configured' });

    const users = JSON.parse(usersRaw);
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const secret = process.env.AUTH_SECRET || 'cb-pipeline-secret-2025';
    const payload = { email: user.email, name: user.name, exp: Date.now() + 8 * 60 * 60 * 1000 };
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    const sig = Buffer.from(payloadB64 + secret).toString('base64');
    const token = payloadB64 + '.' + sig;

    return res.status(200).json({ token, name: user.name, email: user.email });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
