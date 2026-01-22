import { getLoginUrl } from "@/const";
import { useCallback } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  // Static implementation for landing page
  const state = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };

  const logout = useCallback(async () => {
    // No-op
  }, []);

  return {
    ...state,
    refresh: () => { },
    logout,
  };
}
