export function getUsernameFromToken(): string | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('auth_token');
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;

    // Decodificação Base64URL para JSON
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const data = JSON.parse(json);
    return data?.username || data?.name || data?.first_name || null;
  } catch (e) {
    console.error('Erro ao decodificar token:', e);
    return null;
  }
}
