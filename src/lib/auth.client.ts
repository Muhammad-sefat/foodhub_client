import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
baseURL: "https://foodhub-server-3.onrender.com",
  fetchOptions: {
    credentials: "include",
  },
});
