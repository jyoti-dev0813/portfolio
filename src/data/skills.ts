/**
 * Edit this list freely. Delete anything you do not want shown.
 *
 * review:
 * - "stated" — supported by the bio written for this site.
 * - "please-confirm" — listed because a service on the site names it.
 *   Remove the row if you do not want it public.
 *
 * practice:
 * - "daily" — regular working use.
 * - "exploring" — in use, with depth still growing.
 */

export type Skill = {
  name: string;
  review: "stated" | "please-confirm";
  practice: "daily" | "exploring";
};

export type SkillGroup = {
  id: string;
  label: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "HTML", review: "stated", practice: "daily" },
      { name: "CSS", review: "stated", practice: "daily" },
      { name: "JavaScript", review: "stated", practice: "daily" },
      { name: "Responsive interfaces", review: "stated", practice: "daily" },
      { name: "API integration", review: "stated", practice: "daily" },
      { name: "React", review: "please-confirm", practice: "exploring" },
      { name: "Next.js", review: "please-confirm", practice: "exploring" },
      { name: "Accessibility basics", review: "please-confirm", practice: "exploring" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "HTTP APIs", review: "please-confirm", practice: "exploring" },
      { name: "Authentication flows", review: "please-confirm", practice: "exploring" },
      { name: "Server-rendered pages", review: "please-confirm", practice: "exploring" },
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      { name: "Databases", review: "stated", practice: "exploring" },
      { name: "Structured content", review: "please-confirm", practice: "exploring" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { name: "Git", review: "please-confirm", practice: "exploring" },
      { name: "Browser developer tools", review: "please-confirm", practice: "daily" },
      { name: "Figma (viewing and handoff)", review: "please-confirm", practice: "exploring" },
    ],
  },
  {
    id: "creative",
    label: "Creative",
    items: [
      { name: "Graphic design", review: "stated", practice: "exploring" },
      { name: "Branding", review: "stated", practice: "exploring" },
      { name: "Social content", review: "stated", practice: "exploring" },
      { name: "E-commerce presentation", review: "stated", practice: "exploring" },
      { name: "Video editing", review: "please-confirm", practice: "exploring" },
      { name: "AI tools", review: "stated", practice: "exploring" },
    ],
  },
];
