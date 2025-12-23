"use client";

import { useEffect } from "react";
import { tokenStore } from "../lib/storage";

export default function Protected({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Array<"USER" | "ADMIN">;
}) {
  useEffect(() => {
    const access = tokenStore.getAccess();
    const role = tokenStore.getRole() as any;

    if (!access) {
      window.location.href = "/login";
      return;
    }

    if (roles && role && !roles.includes(role)) {
      window.location.href = "/products";
    }
  }, [roles]);

  return <>{children}</>;
}
