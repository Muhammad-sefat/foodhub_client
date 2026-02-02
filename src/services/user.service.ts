import { cookies } from "next/headers";
export const userService = {
  getSession: async function () {
    try {
      const storeCookies = await cookies();
      const authUrl = process.env.AUTH_URL;

      const res = await fetch(`${authUrl}/get-session`, {
        headers: {
          Cookie: storeCookies.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch session" } };
      }

      const session = await res.json();
      return { data: session, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },
};
