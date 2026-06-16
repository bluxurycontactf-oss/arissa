import { auth } from "./firebase";

export const API_URL = process.env.NEXT_PUBLIC_ARISSA_API_URL ?? "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = await auth.currentUser?.getIdToken();

  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  return fetch(`${API_URL}${path}`, { ...options, headers });
}
