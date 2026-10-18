"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconPhone } from "@/components/icons";
import {
  formatPhoneDisplay,
  formatPhoneLink,
  siteConfig,
} from "@/lib/site-config";

const navLinks = [
  { href: "#about", label: "Meet Fatima" },
  { href: "#buy", label: "Looking To Buy?" },
  { href: "#sell", label: "Looking To Sell?" },
  { href: "#guides", label: "Explore Our Area" },
  { href: "#contact", label: "Let's Talk" },
];

const menuLinks = [
  ...navLinks.slice(0, 4),
  { href: "#guides", label: "Guides" },
  navLinks[4],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phone = formatPhoneDisplay(siteConfig.phone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled || open ? " is-solid" : ""}`}>
      <div className="site-header__bar">
        <div className="site-header__left">
          <a className="site-header__phone" href={formatPhoneLink(siteConfig.phone)}>
            <IconPhone />
            <span>{phone}</span>
          </a>
        </div>
        <Link href="/" className="site-header__logo" onClick={() => setOpen(false)}>
          <span className="site-header__mark">FD</span>
          <span className="site-header__logo-copy">
            <span className="site-header__logo-name">Fatima Diallo</span>
            <span className="site-header__logo-sub">Real Estate</span>
          </span>
          <span className="site-header__divider" aria-hidden="true" />
          <span className="site-header__broker">
            <span>Choice</span>
            <span>Residential</span>
          </span>
        </Link>
        <div className="site-header__right">
          <nav className="site-header__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-btn__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <div id="site-menu" className="nav-drawer">
          {menuLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={formatPhoneLink(siteConfig.phone)} onClick={() => setOpen(false)}>
            {phone}
          </a>
        </div>
      )}
    </header>
  );
}
