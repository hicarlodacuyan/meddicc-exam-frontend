"use client";

import { Button } from "@/components/ui/button";
import { logout } from "../api/logout";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Logout() {
  return (
    <Button variant="link" onClick={logout}>
      Logout
      <ArrowRightStartOnRectangleIcon />
    </Button>
  );
}
