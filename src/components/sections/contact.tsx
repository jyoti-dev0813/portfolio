"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { budgetOptions, site, socials, whatsappUrl } from "@/config/site";
import { services } from "@/data/services";
import { contactHeadline } from "@/data/home";
import { buildMailto } from "@/lib/discuss";
import { SocialIcon } from "@/components/brand/social-icon";
import { Button } from "@/components/ui/button";
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";

type Errors = Partial<Record<"name" | "email" | "service" | "budget" | "message", string>>;

const hasFormKey = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);

function ContactForm() {
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const initialService = params.get("service");
  const [service, setService] = useState(
    initialService && services.some((item) => item.id === initialService) ? initialService : "",
  );
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "draft" | "sent" | "error">("idle");

  useEffect(() => {
    const onPick = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (services.some((item) => item.id === id)) setService(id);
    };
    window.addEventListener("shivonix:service", onPick);
    return () => window.removeEventListener("shivonix:service", onPick);
  }, []);

  function validate() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!service) next.service = "Choose a service.";
    if (!budget) next.budget = "Choose a budget, or “Not sure yet”.";
    if (message.trim().length < 20) next.message = "Add at least a sentence about the project.";
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length || botcheck) {
      if (botcheck) setStatus("error");
      return;
    }
    const payload = { name: name.trim(), email: email.trim(), service, budget, message: message.trim() };
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!key) {
      window.location.href = buildMailto(payload);
      setStatus("draft");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `Project inquiry: ${payload.service}`,
          ...payload,
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data: unknown = await response.json();
      const ok = typeof data === "object" && data !== null && "success" in data && data.success === true;
      if (!ok) throw new Error("Not accepted");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const described = (id: keyof Errors) => (errors[id] ? { "aria-invalid": true as const, "aria-describedby": `${id === "service" ? "field-service" : id}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <Field id="name" label="Name" error={errors.name}>
        <TextInput id="name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} {...described("name")} />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <TextInput id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} {...described("email")} />
      </Field>
      <Field id="field-service" label="Service" error={errors.service}>
        <SelectInput id="field-service" name="service" value={service} onChange={(event) => setService(event.target.value)} {...(errors.service ? { "aria-invalid": true, "aria-describedby": "field-service-error" } : {})}>
          <option value="">Select a service</option>
          {services.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field id="budget" label="Budget range" error={errors.budget}>
        <SelectInput id="budget" name="budget" value={budget} onChange={(event) => setBudget(event.target.value)} {...(errors.budget ? { "aria-invalid": true, "aria-describedby": "budget-error" } : {})}>
          <option value="">Select a range</option>
          {budgetOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field id="message" label="Project description" error={errors.message}>
        <TextArea id="message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} {...described("message")} />
      </Field>
      <label className="sr-only">
        Leave this empty
        <input tabIndex={-1} autoComplete="off" value={botcheck} onChange={(event) => setBotcheck(event.target.value)} />
      </label>
      <button type="submit" className="min-h-11 rounded-full bg-violet-deep px-5 text-sm text-white disabled:opacity-60" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : hasFormKey ? "Send message" : "Open email draft"}
      </button>
      <div role="status" aria-live="polite" className="text-sm text-mist">
        {status === "draft" ? "Your email app should open a draft to contactjyotiiagarwal@gmail.com. The message is sent only after you press send there." : null}
        {status === "sent" ? "The form service accepted the message." : null}
        {status === "error" ? "The message was not sent. Use email or WhatsApp instead." : null}
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading index="05" label="Contact" title={contactHeadline} lede={site.availability} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`} variant="secondary">
              Email
            </Button>
            <Button href={whatsappUrl} variant="secondary" external>
              WhatsApp
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
                  aria-label={item.external ? `${item.label} (opens in a new tab)` : item.label}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <SocialIcon id={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Suspense fallback={<p className="text-mist">Loading the form…</p>}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
