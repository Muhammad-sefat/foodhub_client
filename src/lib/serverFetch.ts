import { cookies } from "next/headers";

export async function serverFetch(url: string, options: RequestInit = {}) {
  const storeCookies = await cookies();

  console.log("[serverFetch] Fetching:", url);
  console.log("[serverFetch] Cookies:", storeCookies.toString().substring(0, 100) + "...");

  const res = await fetch(url, {
    ...options,
    headers: {
      Cookie: storeCookies.toString(),
      ...options.headers,
    },
    cache: "no-store",
  });

  console.log("[serverFetch] Response status:", res.status, "for", url);

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("[serverFetch] Error response:", errorBody);
    throw new Error(`Fetch failed ${res.status}: ${errorBody}`);
  }

  const data = await res.json();
  console.log("[serverFetch] Data received:", Array.isArray(data) ? `Array(${data.length})` : typeof data);
  return data;
}
