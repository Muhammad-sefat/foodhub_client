export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

/**
 * TEMP
 * Later this will come from auth (session.user.role)
 */
export const CURRENT_ROLE: Role = "CUSTOMER";
