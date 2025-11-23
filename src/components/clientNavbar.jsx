"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return !isAdmin ? <Navbar /> : null;
}