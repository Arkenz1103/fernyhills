"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Mail, Menu, Phone, X } from "lucide-react";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: lock page scroll, trap Tab focus inside the drawer, close on Escape,
  // and hand focus back to the menu button when it closes.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    drawer?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-slate-200/70 shadow-lg shadow-brand-blue/5" : "border-transparent",
        )}
      >
        <nav aria-label="Main" className="container-x flex h-24 items-center justify-between gap-8">
          <Link href="/" aria-label={`${site.name} – Home`} className="shrink-0 rounded-lg">
            <Image
              src="/images/logo.webp"
              alt={site.name}
              width={240}
              height={148}
              priority
              className="h-20 w-auto"
            />
          </Link>

          <ul className="hidden items-center gap-7 xl:flex 2xl:gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    // Underline grows in from the left on hover and stays on the current page.
                    "relative block py-2 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-200",
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-blue after:transition-transform after:duration-300 motion-reduce:after:transition-none",
                    isActive(item.href)
                      ? "font-semibold text-brand-blue after:scale-x-100"
                      : "text-brand-ink/80 after:scale-x-0 hover:text-brand-blue hover:after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden px-5 text-sm sm:inline-flex"
            >
              <CalendarCheck className="size-4" aria-hidden />
              Book Online
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-lg text-brand-blue transition hover:bg-brand-pale xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-brand-ink/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={close}
        aria-hidden
      />
      <aside
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none xl:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <Image src="/images/logo.webp" alt={site.name} width={240} height={148} className="h-12 w-auto" />
          <button
            type="button"
            onClick={close}
            className="inline-flex size-10 items-center justify-center rounded-lg text-brand-blue hover:bg-brand-pale"
            aria-label="Close menu"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition",
                  isActive(item.href)
                    ? "bg-brand-pale text-brand-blue"
                    : "text-brand-ink hover:bg-brand-pale hover:text-brand-blue",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-3 border-t border-slate-100 p-5 text-sm">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full"
          >
            <CalendarCheck className="size-4" aria-hidden />
            Book Online
          </a>
          <a href={site.phoneHref} className="flex items-center gap-3 text-brand-body hover:text-brand-blue">
            <Phone className="size-4 text-brand-cyan" aria-hidden /> {site.phone}
          </a>
          <a href={site.emailHref} className="flex items-center gap-3 break-all text-brand-body hover:text-brand-blue">
            <Mail className="size-4 shrink-0 text-brand-cyan" aria-hidden /> {site.email}
          </a>
        </div>
      </aside>
    </>
  );
}
