const TOKEN_KEY = 'cb_pipeline_token';
const USER_KEY  = 'cb_pipeline_user';

export function saveSession(token, user) {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

export function getUser() {
    try { return JSON.parse(sessionStorage.getItem(USER_KEY)); }
    catch { return null; }
}

export function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
    const token = getToken();
    if (!token) return false;
    try {
          const [payloadB64] = token.split('.');
          const payload = JSON.parse(atob(payloadB64));
          return payload.exp > Date.now();
    } catch { return false; }
}
