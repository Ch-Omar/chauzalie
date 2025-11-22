"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "../styles/navbar.scss";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false); // Track client mount
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    router.push("/admin");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true); // now we are on client
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(!!admin);
  }, [pathname]); // update on route change

  // Don't render anything until after client mount
  if (!mounted) return null;

  return (
    <header className="nav-header">
      <nav className="navbar">
        <div className="logo">
          <Link href="/" onClick={close}>
            <img className="logoImg" src="/logoT.png" alt="logo" />
          </Link>
        </div>

        <ul className={`nav-links mb-0 ${open ? "open" : ""}`}>
          <li>
            <Link href="/admin/products" onClick={close}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/admin/contact" onClick={close}>
              Contact
            </Link>
          </li>

          {isAdmin && (
            <li>
              <button
                className="btn btn-link text-black p-0 text-decoration-underline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <button
          className={`hamburger ${open ? "is-active" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}