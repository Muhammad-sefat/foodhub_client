import { cookies } from "next/headers";

export async function serverFetch(url: string, options: RequestInit = {}) {
  const storeCookies = await cookies();

  const res = await fetch(url, {
    ...options,
    headers: {
      Cookie: storeCookies.toString(),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Fetch failed ${res.status}: ${errorBody}`);
  }

  const data = await res.json();
  return data;
}
