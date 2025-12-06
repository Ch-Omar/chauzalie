"use client";
import Link from "next/link";
import { useState } from "react";
import "@/styles/navbar.scss";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

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
            <Link href="/" onClick={close}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={close}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={close}>
              Contact
            </Link>
          </li>
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