"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Contact form. There is no backend yet: on submit it opens the visitor's
 * email client with the message pre-filled, addressed to the clinic.
 * Swap `handleSubmit` for a Server Action / API route when a mail provider is chosen.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const body = [
      `Name: ${name}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone Number: ${data.get("phone") ?? ""}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    // mailto: link opening the visitor's mail client, not an internal route.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      `Website enquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-xs outline-hidden transition placeholder:text-slate-400 focus:border-brand-teal-bright focus:ring-4 focus:ring-brand-teal-bright/15";
  const label = "text-sm font-semibold text-brand-ink";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>
            Name <span className="text-brand-teal-bright">*</span>
          </span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>
            Email <span className="text-brand-teal-bright">*</span>
          </span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className={label}>Phone Number</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="block">
        <span className={label}>
          Message <span className="text-brand-teal-bright">*</span>
        </span>
        <textarea name="message" required rows={5} className={field} />
      </label>
      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden />
        Send Message
      </button>
      {sent && (
        <p role="status" className="text-sm text-slate-700">
          Your email app should open with your message ready to send to {site.email}.
        </p>
      )}
    </form>
  );
}
