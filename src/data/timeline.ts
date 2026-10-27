export type TimelineItem = {
  id: string;
  title: string;
  period: string;
  body: string;
  /** verified rows can stay public as written. confirm rows are placeholders. */
  state: "verified" | "confirm";
};

export const timeline: TimelineItem[] = [
  {
    id: "shivonix",
    title: "Founder, Shivonix",
    period: "Present",
    body: "I am the founder and the primary professional behind Shivonix. The studio is how I offer web, commerce, and creative digital work.",
    state: "verified",
  },
  {
    id: "frontend",
    title: "Frontend development",
    period: "More than one year",
    body: "Hands-on frontend work: responsive interfaces and practical digital products. Employer name and exact dates are intentionally blank until confirmed.",
    state: "verified",
  },
  {
    id: "milieu",
    title: "Milieu Solar — contribution",
    period: "CONFIRM dates",
    body: "CONFIRM what you personally designed, built, or edited on milieu.com.my. Do not leave a guessed scope here.",
    state: "confirm",
  },
  {
    id: "education",
    title: "Education",
    period: "CONFIRM",
    body: "CONFIRM institution, credential, and dates. No degree is claimed until this row is replaced.",
    state: "confirm",
  },
];
