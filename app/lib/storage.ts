const ACCESS = "pos_access";
const REFRESH = "pos_refresh";
const ROLE = "pos_role";
const EMAIL = "pos_email";

export const tokenStore = {
  getAccess: () => (typeof window === "undefined" ? null : localStorage.getItem(ACCESS)),
  getRefresh: () => (typeof window === "undefined" ? null : localStorage.getItem(REFRESH)),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS, access);
    localStorage.setItem(REFRESH, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    localStorage.removeItem(ROLE);
    localStorage.removeItem(EMAIL);
  },
  setRole: (role: string) => localStorage.setItem(ROLE, role),
  getRole: () => (typeof window === "undefined" ? null : localStorage.getItem(ROLE)),
  setEmail: (email: string) => localStorage.setItem(EMAIL, email),
  getEmail: () => (typeof window === "undefined" ? null : localStorage.getItem(EMAIL)),
};
