"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { mainNav, memberNav } from "@/lib/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { cn } from "@/utils/cn";

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm transition md:inline-block md:px-2.5 md:py-1",
        active
          ? "text-fg md:bg-white/8"
          : "text-fg-muted hover:text-fg md:hover:bg-white/5",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b border-transparent transition",
          (scrolled || open) && "border-border bg-bg/90 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border"
          >
            <SiteLogo />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {mainNav.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <NavLink key={link.href} href={link.href} label={link.label} active={active} />
              );
            })}
            {memberNav.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={user ? link.label : "Sign in"}
                active={pathname.startsWith(link.href)}
              />
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-fg-muted transition hover:text-fg md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-b border-border bg-bg md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto max-w-5xl space-y-0.5 px-4 py-3 sm:px-6">
            {mainNav.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={active}
                  onClick={close}
                />
              );
            })}
            {memberNav.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={user ? link.label : "Sign in"}
                active={pathname.startsWith(link.href)}
                onClick={close}
              />
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
