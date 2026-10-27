export type ServiceIcon =
  | "layers"
  | "code"
  | "bag"
  | "palette"
  | "share"
  | "megaphone"
  | "clapper"
  | "bot";

export type Service = {
  id: string;
  name: string;
  summary: string;
  deliverables: string[];
  icon: ServiceIcon;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "full-stack",
    name: "Full-Stack Development",
    summary:
      "Web applications that join an interface with APIs, data, and the screens a business actually uses. This is the work I am growing into, and I scope it honestly.",
    deliverables: [
      "Full-stack web apps",
      "Frontend interfaces",
      "Backend APIs",
      "Database integration",
      "Authentication",
      "Admin dashboards",
      "Business applications",
      "E-commerce functionality",
    ],
    icon: "layers",
    featured: true,
  },
  {
    id: "frontend",
    name: "Frontend Development",
    summary:
      "Responsive interfaces with reusable pieces, room for content, and attention to how the page loads and how it reads.",
    deliverables: [
      "Responsive interfaces",
      "React",
      "Next.js",
      "Reusable components",
      "API integration",
      "Accessibility",
      "Performance improvements",
    ],
    icon: "code",
  },
  {
    id: "shopify",
    name: "Shopify and E-commerce",
    summary:
      "Store setup and storefront work for teams that need products, pages, and a layout that holds up on a phone.",
    deliverables: [
      "Store setup",
      "Storefront customization",
      "Product pages",
      "Responsive layouts",
      "Shopping experiences",
    ],
    icon: "bag",
  },
  {
    id: "branding",
    name: "Graphic Design and Branding",
    summary:
      "Visual concepts for a launch, a product, or a social presence. Identity work here is concept-led, not a claim of a large brand practice.",
    deliverables: [
      "Promotional posters",
      "Thumbnails",
      "Brand identity concepts",
      "Social creatives",
      "Product ads",
    ],
    icon: "palette",
  },
  {
    id: "social",
    name: "Social Media Management",
    summary:
      "Planning and making the posts, then keeping the tone consistent from one week to the next.",
    deliverables: [
      "Content planning",
      "Creative production",
      "Scheduling workflows",
      "Brand consistency",
      "Engagement strategies",
    ],
    icon: "share",
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    summary:
      "Campaign concepts, the pages they land on, and creative made to support a specific offer.",
    deliverables: [
      "Marketing creatives",
      "Campaign concepts",
      "Landing pages",
      "Content strategy",
      "Conversion-focused improvements",
    ],
    icon: "megaphone",
  },
  {
    id: "video",
    name: "Video Editing and Content Creation",
    summary:
      "Short-form edits, storyboards, and captions for creators and small brands. Depth depends on the brief.",
    deliverables: [
      "Short-form concepts",
      "Reels",
      "Promotional edits",
      "Storyboards",
      "Captions",
      "Creator content",
    ],
    icon: "clapper",
  },
  {
    id: "ai",
    name: "AI-Powered Digital Solutions",
    summary:
      "Interfaces and prototypes that use AI where it helps a task: a chat screen, a workflow, or a small automation. I do not claim a research lab.",
    deliverables: [
      "Chatbot interfaces",
      "AI integrations",
      "AI-assisted workflows",
      "Automation prototypes",
      "Productivity tools",
    ],
    icon: "bot",
  },
];
