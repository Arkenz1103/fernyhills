"use client";

import { useState } from "react";
import { AlertCircle, Send } from "lucide-react";
import PhoneInput, { isValidPhoneNumber, type Value } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { validatePhoneNumberLength } from "libphonenumber-js/min";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Whether `next` (an E.164 string like "+61412…") is valid, or could still become valid with more digits.
 * Some countries have valid numbers of several lengths (e.g. the Philippines), so we can't simply stop at
 * the first valid number. Instead we probe a few longer versions; if none could ever be valid, the digit is extra.
 */
function canStillBeValid(next: string) {
  if (validatePhoneNumberLength(next) === "TOO_LONG") return false;
  if (isValidPhoneNumber(next)) return true;
  for (let d = 0; d <= 9; d++) {
    // Keep adding the same digit until the number becomes too long for the country.
    for (let candidate = next + d; validatePhoneNumberLength(candidate) !== "TOO_LONG"; candidate += d) {
      if (isValidPhoneNumber(candidate)) return true;
    }
  }
  // Nothing longer is valid: only allow it while the number is still too short to judge.
  return validatePhoneNumberLength(next) === "TOO_SHORT";
}

function validate(values: { name: string; email: string; phone?: Value; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  // Phone is optional, but if something was typed it has to be a real number for that country.
  if (values.phone && !isValidPhoneNumber(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

/**
 * Contact form. There is no backend yet: on submit it opens the visitor's
 * email client with the message pre-filled, addressed to the clinic.
 * Swap `handleSubmit` for a Server Action / API route when a mail provider is chosen.
 */
export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [phone, setPhone] = useState<Value | undefined>();
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  // After the first submit attempt, re-check as the visitor types so errors clear as soon as they're fixed.
  function update(next: Partial<typeof values>, nextPhone: Value | undefined = phone) {
    const merged = { ...values, ...next };
    setValues(merged);
    if (submitted) setErrors(validate({ ...merged, phone: nextPhone }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validate({ ...values, phone });
    setErrors(found);
    const first = (Object.keys(found) as FieldName[])[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone Number: ${phone ?? ""}`,
      "",
      values.message.trim(),
    ].join("\n");
    // mailto: link opening the visitor's mail client, not an internal route.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      `Website enquiry from ${values.name.trim()}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field = (invalid?: string) =>
    cn(
      "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-slate-800 shadow-xs outline-hidden transition placeholder:text-slate-500 focus:ring-4",
      invalid
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
        : "border-slate-200 focus:border-brand-teal-bright focus:ring-brand-teal-bright/15",
    );
  const label = "text-sm font-semibold text-brand-ink";
  const required = <span className="text-brand-teal-bright" aria-hidden>*</span>;

  const errorText = (name: FieldName) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
        <AlertCircle className="size-4 shrink-0" aria-hidden />
        {errors[name]}
      </p>
    ) : null;

  const a11y = (name: FieldName) => ({
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>
            Name {required}
          </label>
          <input
            {...a11y("name")}
            name="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => update({ name: e.target.value })}
            className={field(errors.name)}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>
            Email {required}
          </label>
          <input
            {...a11y("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => update({ email: e.target.value })}
            className={field(errors.email)}
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={label}>
          Phone Number
        </label>
        {/* Country picker + number box. The library only accepts digits and formats as you type. */}
        <PhoneInput
          {...a11y("phone")}
          name="phone"
          international
          countryCallingCodeEditable={false}
          // Stop typing once the number reaches the longest valid length for the chosen country.
          limitMaxLength
          defaultCountry="AU"
          flags={flags}
          autoComplete="tel"
          value={phone}
          // Block digits that would make the number too long to ever be valid for the chosen country.
          onBeforeInput={(e: React.FormEvent<HTMLInputElement> & { data?: string }) => {
            const input = e.currentTarget;
            const typed = (e.data ?? "").replace(/\D/g, "");
            if (!typed || !phone || input.selectionStart !== input.selectionEnd) return;
            if (!canStillBeValid(phone + typed)) e.preventDefault();
          }}
          onChange={(v) => {
            setPhone(v);
            update({}, v);
          }}
          className={cn(field(errors.phone), "contact-phone py-0 pr-0 focus-within:ring-4", errors.phone
            ? "focus-within:border-red-500 focus-within:ring-red-500/15"
            : "focus-within:border-brand-teal-bright focus-within:ring-brand-teal-bright/15")}
        />
        {errorText("phone")}
      </div>

      {/* The message box grows to fill the card, so the card can line up with the column beside it */}
      <div className="flex flex-1 flex-col">
        <label htmlFor="contact-message" className={label}>
          Message {required}
        </label>
        <textarea
          {...a11y("message")}
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => update({ message: e.target.value })}
          className={cn(field(errors.message), "min-h-36 flex-1 resize-none")}
        />
        {errorText("message")}
      </div>

      <button type="submit" className="btn btn-primary w-full sm:w-auto sm:self-end">
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
