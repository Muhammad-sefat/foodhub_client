import { cookies } from "next/headers";

export const userService = {
  async getSession() {
    try {
      const storeCookies = await cookies();

      const res = await fetch(`${process.env.AUTH_URL}/api/auth/get-session`, {
        headers: {
          Cookie: storeCookies.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "No session" } };
      }
      const session = await res.json();
      return { data: session, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },
};
