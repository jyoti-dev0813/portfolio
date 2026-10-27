/**
 * Single source for contact details, social links, and availability.
 * Edit this file when an address, number, or link changes.
 */

export const site = {
  name: "SHIVONIX",
  founder: "Jyoti Agarwal",
  title:
    "Full-Stack Developer | AI Creator | Digital Creative | Founder of Shivonix",
  tagline: "IDEAS INTO DIGITAL EXPERIENCES.",
  supporting:
    "From immersive websites and full-stack applications to e-commerce, branding, and digital growth, Shivonix transforms ideas into meaningful digital experiences.",
  email: "contactjyotiiagarwal@gmail.com",
  phoneDisplay: "+91 74174 10098",
  phoneE164: "917417410098",
  availability:
    "Currently open to freelance projects and full-stack developer roles.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  resumePath: "/resume/Jyoti-Agarwal-Resume.pdf",
} as const;

const whatsappMessage =
  "Hello Jyoti, I would like to talk about a project with Shivonix.";

export const whatsappUrl = `https://wa.me/${site.phoneE164}?text=${encodeURIComponent(whatsappMessage)}`;

export const recruiterMailto = `mailto:${site.email}?subject=${encodeURIComponent("Full-stack developer opportunity")}&body=${encodeURIComponent("Hello Jyoti, I have a full-stack developer opportunity to discuss.")}`;

export const socials = [
  { id: "email", label: "Email", href: `mailto:${site.email}`, external: false },
  { id: "whatsapp", label: "WhatsApp", href: whatsappUrl, external: true },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jyoti-agarwal-a01663402/",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/ai.by.jyoti/",
    external: true,
  },
  {
    id: "threads",
    label: "Threads",
    href: "https://www.threads.com/@ai.byJyoti",
    external: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/1GdEpoojT2/",
    external: true,
  },
  {
    id: "channel",
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029VbCkrOL1NCrZiLD1ws1H",
    external: true,
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/aibyJyoti",
    external: true,
  },
] as const;

export type SocialId = (typeof socials)[number]["id"];

export const nav = [
  { href: "/#top", id: "top", label: "Home" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#lab", id: "lab", label: "Creative Lab" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export const budgetOptions = [
  "Not sure yet",
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000 and above",
] as const;

export const beamMarks = [
  { id: "top", label: "Idea" },
  { id: "about", label: "Craft" },
  { id: "services", label: "Build" },
  { id: "work", label: "Proof" },
  { id: "lab", label: "Create" },
  { id: "contact", label: "Launch" },
] as const;
